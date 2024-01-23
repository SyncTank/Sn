(function scriptedWebServiceOperation(request, response) {
	//var rec = new GlideRecord('sc_request');
	var rec = new GlideRecord('sc_req_item');
	rec.addQuery('request', request.PMGetRequestId);
	//rec.addQuery('request', request.PMCancelRequestId);
	rec.query();

	//if(rec.get(request.PMGetRequestId))

	//if (rec.next())
	//{
	//	if(request.PMCancelComment == 'Approved' || request.PMCancelComment == 'approved')
	//	{
	//		rec.approval = 'approved';
	//		rec.update();
	//	}
	//	else if(request.PMCancelComment=='Denied' || request.PMCancelComment=='denied')
	//	{
	//		rec.approval='rejected';
	//		rec.update();
	//	}
	//	response.PMCancelResult = 'Success';
	//}

	// Original Script
	if(rec.next())
	{
		//var status = rec.getValue();
		var status = rec.getValue('approval');
		if ('approved' == status)
		{
			response.PMApprovalStatus = 'approved';
			response.PMComment = 'Approval comment here.';
		}
		else if ('rejected' == status)
		{
			response.PMApprovalStatus = 'rejected';
			response.PMComment = 'Rejection comment here.';
		}
		else
			response.PMApprovalStatus = 'pending';
	}
	else
	{
		response.PMApprovalStatus = 'invalid';
	}
})(request, response);