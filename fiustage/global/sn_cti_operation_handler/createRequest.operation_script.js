(function(/*CTIOperationRequest*/ request, /*CTIOperationResponse*/ response, /*context*/ ctx) {
	var lang = request.getLanguage();
	try { 
		var interactionGr = request.getInteractionRecord();
		var short_description = request.getParameter('short_description');

		var gr = new GlideRecordSecure('sc_request');
		if(interactionGr) {
			gr.setValue("caller_id", interactionGr.opened_for.toString());
		}
		gr.setValue("contact_type", "phone");
		gr.setValue("short_description", short_description);
		gr.insert();

		var notes = gs.getMessageLang("sc_request {0} has been created.", lang, [gr.getValue("number")]);

		response.setStatusCode(200);
		response.setMessage(notes);

		if(interactionGr) {
			interactionGr.work_notes = notes;
			interactionGr.update();
			
			var grRelated = new GlideRecordSecure('interaction_related_record');
			grRelated.initialize();
			grRelated.document_id = gr.sys_id;
			grRelated.document_table = gr.getTableName();
			grRelated.interaction = interactionGr.sys_id;
			grRelated.insert();
		}
	} catch(e) {
		ctx.setError(e);
	}

})(request, response, ctx);
