	var crudapp	= angular.module('samplecrud',['ngRoute']);
	
	crudapp.config(function($routeProvider){
	$routeProvider.when(
	'/manageemployee',
	{
	templateUrl:'employee.html',
	controller:'empcontroller'
	}).when(
	'/managenotes',
	{
	templateUrl:'notes.html',
	controller:'notescontroller'
	}).otherwise({ redirectTo:'\home'});
	
	});
		/*http requesting service*/
	crudapp.service('apiservice',['$http',function($http){
	
	 this.getnotes = function(url){
			return $http.get(url); 
	 }
	
	return ({getnotes:this.getnotes});
	}]);
	/*http requesting service*/
	/*notes controller*/
	
	crudapp.controller('notescontroller',['$scope','$rootScope','apiservice',function($scope,$rootScope,apiservice){
	 $scope.notes = [{title : 'Webapp',content:'W3schools.com'}];
	 $scope.notescall = function(){
	  apiservice.getnotes('api/notes').then(function(response){
	  	 $scope.notes = response.data;
	  });
	  };
	$scope.notescall();
	}]);
	
	crudapp.filter('recordsfilter',function(){
		return function(input){
			var res,r,txt;
			txt = '';
			for(i=0;i<input.length;i++){
				r = input[i];
				if(i==0)
				r = r.toUpperCase();
				else
					r = r.toLowerCase();
				txt = txt+r;
			}
			return txt;
		};
	});
	/*notes controller*/

	
	crudapp.controller('empcontroller',['$scope',function($scope){
	$scope.addrow = function(){
	var copieddata =angular.copy($scope.employees[5]);
	$scope.employees.push(copieddata);
	};
	
	$scope.employees = [
	{ id:1,name:'muthu',designation:'SE',web:'www.muthutht.com'},
	{ id:2,
	  name:'muthu',
	  designation:'SE',
	  web:'www.muthusdfsdftht.com'
	},
	{ id:3,
	  name:'muthu',
	  designation:'SE',
	  web:'www.asdasd.com'
	},
	{ id:4,
	  name:'muthu',
	  designation:'SE',
	  web:'www.dfgfff.com'
	},
	{ id:5,
	  name:'muthu',
	  designation:'SE',
	  web:'www.asdeere.com'
	},
	{ id:6,
	  name:'muthu',
	  designation:'SE',
	  web:'www.ttttttt.com'
	}];
	
	}]);