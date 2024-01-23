(function(/*CTIOperationRequest*/ request, /*CTIOperationResponse*/ response) {

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
					qc.addOrCondition("u_custom_phone", phone);
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
            if (foundUser) {
                response.setSessionAttribute('snc_user_first_name', userGr.getValue('first_name'));
                response.setSessionAttribute('snc_user_last_name', userGr.getValue('last_name'));
                response.setSessionAttribute('snc_user_sys_id', userGr.getUniqueValue());
                response.setSessionAttribute('snc_user_vip', userGr.getDisplayValue('vip'));
				response.setSessionAttribute('#',
				userGr.getDisplayValue('employee_number'));
            } else {
                response.setSessionAttribute('snc_user_sys_id', "USER_NOT_FOUND");
            }
                                                
            response.setStatusCode(200);
            response.setMessage('success');
        }
    } catch (e) {
        ctx.setError(e);
    }

})(request, response);
