(function( /*CTIOperationRequest*/ request, /*CTIOperationResponse*/ response, /*Context*/ ctx) {

    try {
        var state = request.getParameter('$state');
        var vendorId = request.getVendor();
        if (!state) {
            state = 'new';
        }
        var phone = request.getParameter('contact.phone');
        var username = request.getParameter('contact.username');
        var someDataPresent = phone || username;
        if (!someDataPresent) {
            throw 'phone or username must be supplied';
        }
        if ('new' === state) {
            var userGr = null;
            if (phone || username) {
                userGr = new GlideRecordSecure('sys_user');
                var qc = null;
                if (phone) {
                    qc = userGr.addQuery('phone', phone);
					qc.addOrCondition("u_nsse_two_factor", phone);
					qc.addOrCondition('u_custom_phone', phone);
                    qc.addOrCondition('mobile_phone', phone);
                    qc.addOrCondition("home_phone", phone);
                }
                if (username) {
                    if (qc) {
                        qc.addOrCondition('user_name', username);
                    } else {
                        qc = userGr.addQuery('user_name', username);
                    }
                }
                // If there was criteria then run the query
                if (qc) {
                    userGr.query();
                } else {
                    userGr = null;
                }
            }

            var foundUser = userGr && userGr.next();

            var phonelogGr = new GlideRecord('sn_openframe_phone_log');
            phonelogGr.initialize();
            phonelogGr.setValue('call_id', request.getParameter('contact.id'));
            phonelogGr.setValue('phone_number', phone);
            if (foundUser) {
                phonelogGr.setValue('contact', userGr.getUniqueValue());
            }
            phonelogGr.insert();

            var interactionGr = new GlideRecordSecure('interaction');
            interactionGr.initialize();
            interactionGr.setValue('type', 'phone');
            interactionGr.setValue('#");

            if(request.getParameter('isPasswordResetRequest') === 'true'){
				interactionGr.setValue('short_description', 'Password Reset via Phone: ' + phone);
                interactionGr.setValue('u_problem_type', "Password reset");
			} else {
				interactionGr.setValue('short_description', 'General Support via Phone: ' + phone);
			}
			//interactionGr.setValue('short_description', 'User Contact via Phone: ' + phone);
            interactionGr.setValue('channel_metadata_table', 'sn_openframe_phone_log');
            interactionGr.setValue('channel_metadata_document', phonelogGr.getUniqueValue());
            interactionGr.setValue('u_caller_phone', phone);

            if (foundUser) {
                interactionGr.setValue('opened_for', userGr.getUniqueValue());
                response.setSessionAttribute('snc_user_first_name', userGr.getValue('first_name'));
                response.setSessionAttribute('snc_user_last_name', userGr.getValue('last_name'));
                response.setSessionAttribute('snc_user_sys_id', userGr.getUniqueValue());
				response.setSessionAttribute('snc_user_panther_id', userGr.getDisplayValue('employee_number'));
				response.setSessionAttribute('opened_for.u_fiuroles', userGr.getDisplayValue('u_fiuroles'));
				//response.setSessionAttribute();
                response.setSessionAttribute('snc_user_vip', userGr.getDisplayValue('vip'));
            } else {
                response.setSessionAttribute('snc_user_sys_id', "USER_NOT_FOUND");
            }
            interactionGr.setValue('state', 'new');

            if (vendorId) {
                interactionGr.setValue('ccc_source', vendorId);
            }

            var interactionId = interactionGr.insert();

            response.setStatusCode(200);
            response.setMessage('success');
            response.setSessionAttribute('interactionTable', 'interaction');
            response.setSessionAttribute('interactionId', interactionId);

        }
    } catch (e) {
        ctx.setError(e);
    }

})(request, response);