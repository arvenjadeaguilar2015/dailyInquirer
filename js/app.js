var scaffoldingModule = angular.module("app",['ngRoute']);

scaffoldingModule.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/news', {templateUrl: 'template/topNews.html', controller: "topNewsCtrl"}).
            when('/stories', {templateUrl: 'template/topStories.html', controller: "topStoriesCtrl"}).
            otherwise({redirectTo: '/news'});
    }
]);


scaffoldingModule.controller ("topNewsCtrl", function ($http,$route,$scope) {

	$scope.page=0;
	$scope.category = "All";
	$scope.loading = true;
	$scope.categories = ["World","Arts","Sports","Education","Technology","U.S.","Business Day","Fashion & Style","Style","Crosswords/Games","N.Y. / Region","NYT Now","The Upshot","Theater","Movies","Science","Books"];
	function query(page,category){
		var offset = page*20;
		category = category.toLowerCase();
		$http.get("http://api.nytimes.com/svc/news/v3/content/all/"+ category +".json?api-key=d6cc2c5c8970d7fa72f633c0a2a853a8:0:73365769&limit=20&offset="+offset).success(function(response){

			$scope.data = response;
			$scope.loading = false;
		});
	};

	$scope.next = function(){
		$scope.loading = true;
		$scope.page = $scope.page + 1;
		query($scope.page,$scope.category);
	};

	$scope.prev = function(){
		$scope.loading = true;
		$scope.page = $scope.page - 1;
		query($scope.page,$scope.category);
	};

	$scope.changeCategory = function(category){
		$scope.page=0;
		$scope.loading = true;
		$scope.category = category;
		query($scope.page,$scope.category);
	};
	query($scope.page,$scope.category);

});


scaffoldingModule.controller ("topStoriesCtrl", function ($http,$route,$scope) {
	$scope.page=0;
	$scope.category = "Home";
	$scope.loading = true;
	$scope.categories = ["Home","World","National","Politics","Nyregion","Business","Opinion","Technology","Science","Health","Sports","Arts","Fashion","Dining","Travel","Magazine","Realestate"];
	function query(page,category){
		var offset = page*20;
		category = category.toLowerCase();
		$http.get("http://api.nytimes.com/svc/topstories/v1/"+ category +".json?api-key=5780ad3fa2f52bafa3967abddefeb341:0:73365769").success(function(response){

			$scope.data = response;
			$scope.loading = false;
		});
	};


	$scope.changeCategory = function(category){
		$scope.page=0;
		$scope.loading = true;
		$scope.category = category;
		query($scope.page,$scope.category);
	};
	query($scope.page,$scope.category);


});
