(function scriptedWebServiceOperation(request, response) {
	var cart = new Cart();
	var item = cart.addItem('3f18efb41bcab510687d4225bd4bcb4c');

	cart.setVariable(item, 'PMFileCommandLine', request.PMFileCommandLine);
	cart.setVariable(item, 'PMAgentId', request.PMAgentId);
	cart.setVariable(item, 'PMAgentName', request.PMAgentName);
	cart.setVariable(item, 'PMApprovalId', request.PMApprovalId);
	cart.setVariable(item, 'PMProcessId', request.PMProcessId);
	cart.setVariable(item, 'PMProcessName', request.PMProcessName);
	cart.setVariable(item, 'PMApprovalStatus', request.PMApprovalStatus);
	cart.setVariable(item, 'PMApproverId', request.PMApproverId);
	cart.setVariable(item, 'PMApproverName', request.PMApproverName);
	cart.setVariable(item, 'PMApproverSID', request.PMApproverSID);
	cart.setVariable(item, 'PMIsEndpointApproval', request.PMIsEndpointApproval);
	cart.setVariable(item, 'PMFilePath', request.PMFilePath);
	cart.setVariable(item, 'PMFileCompanyName', request.PMFileCompanyName);
	cart.setVariable(item, 'PMFileDescription', request.PMFileDescription);
	cart.setVariable(item, 'PMFileProductName', request.PMFileProductName);
	cart.setVariable(item, 'PMFileProductVersion', request.PMFileProductVersion);
	cart.setVariable(item, 'PMFileSha1Hash', request.PMFileSha1Hash);
	cart.setVariable(item, 'PMFileVersion', request.PMFileVersion);
	cart.setVariable(item, 'PMInitiatorId', request.PMInitiatorId);
	cart.setVariable(item, 'PMInitiatorName', request.PMInitiatorName);
	cart.setVariable(item, 'PMInitiatorSID', request.PMInitiatorSID);
	cart.setVariable(item, 'PMInitiatorUserName', request.PMInitiatorUserName);
	cart.setVariable(item, 'PMFileOriginalFileName', request.PMFileOriginalFileName);
	cart.setVariable(item, 'PMParentFileSha1Hash', request.PMParentFileSha1Hash);
	cart.setVariable(item, 'PMPolicyId', request.PMPolicyId);
	cart.setVariable(item, 'PMPolicyName', request.PMPolicyName);
	cart.setVariable(item, 'PMSecondaryFileSha1Hash', request.PMSecondaryFileSha1Hash);
	cart.setVariable(item, 'PMUserReason', request.PMUserReason);

	var rc = cart.placeOrder();
	response.PMRequestId = rc.sys_id;

	//if(request.PMApprovalStatus)
	//{
	//	var gr = new GlideRecord('sc_request');
	//	gr.get(rc.sys_id);
	//
	//	gr.setValue('pending', request.PMApprovalStatus);
	//	gr.setValue('stage', 'waiting_for_approval');
	//	gr.update();
	//}
})(request, response);