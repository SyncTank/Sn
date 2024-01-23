var canCreateIncident = false;
if ((current.isNewRecord() && current.canCreate()) || (!current.isNewRecord() && current.canWrite()))
	canCreateIncident = current.update();
else
	canCreateIncident = true;

if (canCreateIncident) {
	var inc = new GlideRecord("incident");
	inc.initialize();

	inc.caller_id = current.opened_for;
	inc.short_description = current.short_description;
	if(current.type == "phone" && current.u_problem_type == 'Password reset')
		{
			inc.subcategory = 'Password Reset Staff';
		}
	// conditional statement for staff vs students
	
	inc.assignment_group.setValue("#");
	inc.assignment_group.setDisplayValue("#");
	
	inc.u_parent_interaction.setValue(current.number);
	inc.u_parent_interaction.setDisplayValue(current.number);

	if (gs.getProperty("com.snc.incident.create_from_interaction.save") === 'true') {
		inc.work_notes = gs.getMessage('Incident created from Interaction {0}', current.number);
		var incSysId = inc.insert();
		if (incSysId) {
			if (gs.getProperty('com.snc.incident.create_from_interaction.copy_attachments' , false) === 'true') {
				var serviceInteractionUtils = new global.ServiceInteractionUtils();
				serviceInteractionUtils.copyAttachments(current, inc);
			}
			var interactionRelatedGR = new GlideRecord("interaction_related_record");
			interactionRelatedGR.initialize();
			interactionRelatedGR.interaction = current.sys_id;
			interactionRelatedGR.document_table = 'incident';
			interactionRelatedGR.document_id = incSysId;
			interactionRelatedGR.insert();
		}
	}
	action.openGlideRecord(inc);
}