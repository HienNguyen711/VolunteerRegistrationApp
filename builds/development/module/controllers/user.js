myApp.controller('UserController', ['$scope', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$location', 'FIREBASE_URL',
  function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $location, FIREBASE_URL) {

  var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );
  var authData = authObj.$getAuth();

  if (authData) {
    $scope.userId = authData.uid;

    var userRef = new Firebase( FIREBASE_URL + '/users/' + authData.uid + '/events' );
    var eventAry = $firebaseArray( userRef );

    eventAry.$loaded().then(function( data ) {
      $scope.events = eventAry;
    }); // user events loaded

    $scope.deleteEvent = function( id ) {
       var event = new Firebase( FIREBASE_URL + '/users/' + authData.uid + '/events/' + id );
       event.remove();
    }

    $scope.addEvent = function() {
      var myEvent = {
        creator: authData.uid,
        name: $scope.event.name,
        description: $scope.event.description,
        task: $scope.event.task,
        numberOfVolunteerNeeded: $scope.event.numberOfVolunteerNeeded,
        location: $scope.event.location,
        date: $scope.event.date.toString(),
        added: Firebase.ServerValue.TIMESTAMP
      };

      var newRef = userRef.push(myEvent, function() {
        $scope.event.name = '';
        $scope.event.description = '';
          $scope.event.task = '';
          $scope.event.numberOfVolunteerNeeded = 1;
        $scope.event.location = '';
        $scope.event.date = '';
        $('#postModal').modal('hide');
      });
    } // addevent
  } else {
    $location.path('/');
  } // check authentication

}]);
