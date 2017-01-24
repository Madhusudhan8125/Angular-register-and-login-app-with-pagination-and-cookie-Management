var app = angular.module('loginapp', ['ngRoute','ngCookies']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : 'login.html'
  })
  .when('/home', {
   resolve: {
      "auth": function($location, $rootScope){
        if(!$rootScope.loggedIn){
         $location.path('/');
       }
     }
   }
   templateUrl : 'home.html'
  })
  .otherWise({
   redirectTo: '/'});
  });

app.controller('RegisterCtrl', function($scope, $cookies){
  $scope.setCookie = function(){
    $cookies.put('name', $scope.Name);
    $cookies.put('pass', $scope.Password);
    var myc1 = $cookies.get('name');
    var myc2 = $cookies.get('pass');
    alert("Enter you credentials in the Login Div");
  };

});

app.controller('loginCtrl', function($scope, $location, $rootscope){
  $scope.submit = function() {
    $scope.myc1 = $cookies.get('name');
    $scope.myc2 = $cookies.get('pass');
    if($scope.username == 'myc1' && $scope.password == 'myc2'){
        $rootScope.loggedIn = true;
        $location.path('/home');

    }
    else {
      alert("Enter valid Username and Password");
    }
  };
});

app.controller('PaginationCtrl', ['$scope', '$filter', function ($scope, $filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.searchBox = '';
    
    for (var i=0; i<100; i++) {
        $scope.data.push("Data Number"+i="is printing");
    }

    $scope.getData = function () {
      return $filter('filter')($scope.data, $scope.searchBox);
    }
  
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }

}]);
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        return input.slice(start);
    }
});
