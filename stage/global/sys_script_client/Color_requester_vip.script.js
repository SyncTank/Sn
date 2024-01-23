function onLoad() {
   //Set Incident Status Color
 var stateLabel = g_form.getLabel('caller_id');
 var stateValue = g_form.getValue('caller_id');
 var userData = stateValue.vip;

 if (userData == true) {
stateLabel.style.color= 'red';
stateLabel.style.fontWeight='bold';
 }

   
}