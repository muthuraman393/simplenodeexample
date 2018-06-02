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
	}).when(
	'/editnotes/:id',{
	templateUrl:'edit.html',
	controller:'notescontroller'}
	).otherwise({ redirectTo:'\home'});
	
	});
		/*http requesting service*/
	crudapp.service('apiservice',['$http',function($http){
	
	 this.getnotes = function(url){
			return $http.get(url); 
	 }
	 this.addnotes = function(url,data){
		 return $http.post(url,data);
	 }
	 this.getnote = function(url){
		 return $http.get(url);/*just change this to deleete method for deleting the record*/
	 }
	this.updatenote = function(url,data){
		 return $http.put(url,data);
	 }
	return ({getnotes:this.getnotes,addnotes:this.addnotes,getnote:this.getnote,updatenote:this.updatenote});
	}]);
	/*http requesting service*/
	/*notes controller*/
	crudapp.controller('editnotescontroller',['$scope','$rootScope','apiservice','$location',function($scope,$rootScope,apiservice,$location){
		
	}]);
	crudapp.controller('notescontroller',['$scope','$rootScope','apiservice','$location','$routeParams', function($scope,$rootScope,apiservice,$location,$routeParams){
	 $scope.note = {title : 'Webapp',content:'W3schools.com'};
	 
	 var hasitem = $routeParams;

	 $scope.notescall = function(){
	  apiservice.getnotes('api/notes').then(function(response){
	  	 $scope.notes = response.data;
	  });
	  $scope.createmsg = '';
	  };

	  
	if(hasitem.id != undefined){		 
		 apiservice.getnote('api/products/'+hasitem.id).then(function(response){
	  	 $scope.editnote = response.data;
	  });
		 
	 }
	 else{
			$scope.notescall();
	 }
	 console.log(hasitem);
	 
	 $scope.ngeditform = function(){
		 $scope.createmsg = '';
		  if($scope.form.editform.$valid){
			  $scope.editnotes();
		  }
		  else
			  return false;
	 }
	 	  $scope.editnotes = function(){
			  apiservice.updatenote('api/products/'+hasitem.id,$scope.editnote).then(function(response){
				  
				 $scope.createmsg =   response.data.message;
			  });
		  };
	 
	 	$scope.navigate= function(id){
		var losst= window.location.href;
		$location.path('/editnotes/'+id);
	};	
	  $scope.ngsubmitform = function(){
		  $scope.createmsg = '';
		  if($scope.form.addform.$valid){
			  $scope.addnote();
		  }
		  else
			  return false;
		  
	  }
	  $scope.addnote = function(){
		  apiservice.addnotes('api/products',$scope.note).then(function(response){
			  console.log(response.data);
			  
			  $scope.notes.push(angular.copy($scope.note));
			  $scope.createmsg = response.data.message;
		  });
		  
	  };
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