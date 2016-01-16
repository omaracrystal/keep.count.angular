app.controller("counterController", ["$scope", "httpFactory", "$timeout", function($scope, httpFactory, $timeout){

  $scope.messageSection = false;
  $scope.edit = false;
  $scope.message = "";
  $scope.counter = {};

  var counterUrl = "";
  var countersUrl = "/api/v1/counters"

  getCounters = function(url){
    httpFactory.get(url)
    .then(function(response){
      $scope.counters = response.data;
    });
  };

  function showMessage(messageString) {
    getCounters(countersUrl);
    $scope.messageSection = true;
    $scope.message = messageString;
    $timeout(function() {
      $scope.messageSection = false;
    }, 5000);
  }

  getCounters(countersUrl);

  $scope.postCounter = function(){
    var payload = $scope.counter;
    httpFactory.post(countersUrl, payload);
    $scope.counter = {};
    showMessage("Counter Successfully Added!");
  };

  $scope.editCounter = function(id){
    counterUrl = "/api/v1/counter/" + id;
    httpFactory.get(counterUrl).then(function(response) {
      $scope.counter = response.data;
    });
    $scope.edit = true;
  };

  $scope.updateCounter = function() {
    var payload = $scope.counter;
    httpFactory.put(counterUrl, payload);
    $scope.edit = false;
    $scope.counter = {};
    showMessage("Counter Successfully Updated!");
  }

  $scope.deleteCounter = function(id) {
    counterUrl = "/api/v1/counter/" + id;
    httpFactory.delete(counterUrl);
    showMessage("Counter Successfully Deleted!");
  }

}]);