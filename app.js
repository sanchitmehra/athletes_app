var app = angular.module('myapp',['ngRoute']);


app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'basic_info.html',
        controller:'basic_infocontroller'
    })
    .when('/basic_info',{
        templateUrl:'basic_info.html',
        controller:'basic_infocontroller'
    })
    .when('/about',{
        templateUrl:'about.html',
        controller:'aboutcontroller'
    })
    .when('/summary',{
        templateUrl:'summary.html',
        controller:'summarycontroller'
    })
    .when('/list',{
        templateUrl:'list.html',
        controller:'listcontroller'
    })
    .when('/socialmedia',{
        templateUrl:'social_media.html',
        controller:'socialmediacontroller'
    })  

    .otherwise({
        redirectTo: '/' 
    });
});


app.controller('basic_infocontroller',function($scope, $rootScope, $http, $location)
{   
    
    $scope.team = ["New York Giants", "Atlanta Hawks", "Denver Nuggets", "Detroit Pistons", "Houston Rockets", "Indiana Pacers", "Los Angeles Lakers"];
    if(localStorage.basicinfo == undefined){
        $scope.info ={};
    }

    if(localStorage.basicinfo){
        $scope.info = JSON.parse(localStorage.basicinfo);
    }
    
    $scope.click = function(){
         
    localStorage.basicinfo = JSON.stringify($scope.info);

        $location.path('/about');

    // $http.get('http://localhost:3000/data').success(function(response) {
        
    //   }); 


    }

 });

    app.controller('aboutcontroller',function($scope, $location)
    {   
        $scope.sports = ["Golf", "Tennis", "Basketball", "Basketball", "Football", "Archery", "Fencing", "Rugby", "Sailing", "Shooting"];

        if(localStorage.aboutinfo == undefined){
            $scope.about ={};
        }

        if(localStorage.aboutinfo){
            $scope.about =JSON.parse(localStorage.aboutinfo);
        }

        $scope.click = function(){
            console.log($scope.about);
            localStorage.aboutinfo = JSON.stringify($scope.about);
            $location.path('/socialmedia');
        }
    });

    app.controller('socialmediacontroller',function($scope, $location)
    {   
        

        if(localStorage.socialmedia == undefined){
            $scope.socialmedia ={};
        }

        if(localStorage.socialmedia){
            $scope.socialmedia =JSON.parse(localStorage.socialmedia);
        }

        $scope.click = function(){
            console.log($scope.socialmedia);
            localStorage.socialmedia = JSON.stringify($scope.socialmedia);
            $location.path('/summary');
        }
    });
    
    app.controller('summarycontroller',function($scope,$rootScope,$http, $location)
    {
       if(localStorage.basicinfo!=undefined){
        $scope.basicInfo = JSON.parse(localStorage.basicinfo);
        $scope.about = JSON.parse(localStorage.aboutinfo);
        $scope.socialMedia = JSON.parse(localStorage.socialmedia);
       }
  console.log($scope.basicInfo);

  //console.log($scope.basicInfo);

  $scope.editbasicinfo = function(){
      $location.path('/basic_info');
  }

  $scope.save = function(){
      if(localStorage.basicinfo != undefined){
        var basicinfo = JSON.parse(localStorage.basicinfo);
          var aboutinfo = JSON.parse(localStorage.aboutinfo);
          var socialmediainfo = JSON.parse(localStorage.socialmedia);
      }
          //var alldata = Object.assign({ }, basicinfo, aboutinfo);   
          var alldata  = $.extend(basicinfo, aboutinfo, socialmediainfo);
          console.log(alldata);
          //console.log(Object.keys(alldata).length);

    $http.post('http://localhost:3000/save_athlete', alldata)
    .success(function(response){
      if(response){
        console.log(response);
        
      }
    
    });
    localStorage.removeItem('basicinfo');
    localStorage.removeItem('aboutinfo');
  }

});

app.controller('listcontroller',function($scope, $http, $location)
    {   
        $scope.athletes = [];
      
        $http.post('http://localhost:3000/getathletes').success(function(response) {
                console.log(response.data);
                $scope.athletes = response.data;
                
                });
                
                console.log("aa gye vapis athlete le chak   "+$scope.athletes);
     
    });