(function scriptedWebServiceOperation(request, response) {
	// TODO: cancel request.PMCancelRequestId request here, use request.PMCancelComment for comment
	//response.PMCancelResult = 'Success';
	var gr = new GlideRecord('sc_req_item');
	gr.addQuery('request',request.PMCancelRequestId);
	gr.query();
	if (gr.next())
	{
		gr.approval='rejected';
		gr.update();

		response.PMCancelResult = 'Success';
	}

})(request, response);