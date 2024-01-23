function ($rootScope, $scope, snRecordWatcher, spUtil, $location, $uibModal, cabrillo, $timeout, $window){
	$scope.userID = $scope.user.sys_id;
	if (cabrillo.isNative())
		$scope.isViewNative = true;

	$scope.openPopUp = function() {
		var url = "$chat_support.do?queueID=" + $scope.data.connect_support_queue_id;
		var popup = window.open (url, "popup", "width=900, height=600"); 
	};
	
	/* GOOGLE ANALYTICS	*/
	
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-28172370-14', 'auto');
  
	//browser load page view
	ga('send', {
		hitType: 'pageview',
		title: $window.document.title,
		location: $location.absUrl()
		});
	
	//angular navigate pagew view
	$rootScope.$on('$locationChangeSuccess', function(event, toState, toParams){
		ga('send', {
		hitType: 'pageview',
		title: $window.document.title,
		location: $location.absUrl()
		});
	})
	


	$scope.openLogin = function () {
		$scope.modalInstance = $uibModal.open({
			templateUrl: 'modalLogin',
			scope: $scope
		});
	};
	
	$scope.goLogin = function () { 
	//$window.location = "/login_with_sso.do?glide_sso_id=" + $scope.data.default_idp; 
		
		// Uses the page redirect for login to make a callback reference to a clone page
		// ie  https://fiu.service-now.com/eic -> https://fiu.service-now.com/eic?id=eic_index_login
		//  Public on main not on sub-page. -Rudy
		$window.location = "/" + $scope.data.url_suffix + "?id=" + $scope.data.url_suffix + "_index_login";
		scope: $scope 
	}; 

	$rootScope.$on('sp.avatar_changed', function() {
		$scope.userID = "";
		$timeout(function(){
			$scope.userID = $scope.user.sys_id;
		});
	});

	$scope.isHomepage = function() {
		if (!$scope.page.id)
			return true;

		if ($scope.page.id == $scope.portal.homepage_dv)
			return true;

		return false;
	};

}