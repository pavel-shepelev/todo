var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {


    var refresh = function() {
        $http.get('/todosdatabase').success(function(response) {
            $scope.todosdatabase = response;
            $scope.todo = "";
        });
    };

    refresh();

    $scope.addTodo = function() {
        console.log($scope.todo);
        $http.post('/todosdatabase', $scope.todo).success(function(response) {
            console.log(response);
            refresh();
        });
    };


    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/todosdatabase/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/todosdatabase/' + id).success(function(response) {
            $scope.todo = response;
        });
    };

    $scope.update = function() {
        console.log($scope.todo._id);
        $http.put('/todosdatabase/' + $scope.todo._id, $scope.todo).success(function(response) {
            refresh();
        })
    };



    $scope.deselect = function() {
        $scope.todo = "";
    };


}])
