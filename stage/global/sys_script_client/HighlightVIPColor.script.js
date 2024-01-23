function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	var callerLabel = $('label.incident.u_requested_for');
	var callerField = $('sys_display.incident.u_requested_for');
	
	if (!callerLabel || !callerField) {
      return;
   }
	
	if(!newValue){
		callerField.setStyle({color: "red"});
		return;
	}
	g_form.getReference('u_requested_for', vipCallBack);
	
	function vipCallBack(u_requested_for){
		var callerLabel = $('label.incident.u_requested_for').down('label');
		var callerField = $('sys_display.incident.u_requested_for');
		if (!callerLabel || !callerField) {
		  return;
		   }
		
		if(u_requested_for.vip == 'true')
			{
				callerField.setStyle({color: "red"});
			}
	}
	

   //Type appropriate comment here, and begin script below
   
}// | u_requested_for