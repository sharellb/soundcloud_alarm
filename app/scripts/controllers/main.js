'use strict';

/**
 * @ngdoc function
 * @name alarmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alarmApp
 */

 
angular.module('alarmApp')
  .controller('MainCtrl', function ($scope, $filter,localStorageService) {
    

    /* TO DO*/
    var todosInStore = localStorageService.get('todos');
        $scope.todos = todosInStore || [];
        $scope.$watch('todos', function () {
            localStorageService.set('todos', $scope.todos);
    }, true);

    $scope.addTodo = function () {
    	$scope.todos.push($scope.todo);
    	$scope.todo = '';
    };
    $scope.removeTodo = function (index) {
    	$scope.todos.splice(index, 1);
    };

    /* SOUNDCLOUD */
    $scope.init = function(){
        SC.initialize({
            client_id: ENV['CLIENT_ID']
        });
    };
    
    $scope.stream_url = '/tracks/297';
    $scope.startSong = function(stream_url) {
        console.log(stream_url);
        SC.stream(stream_url, function(sound){
            $scope.sound = sound;
            sound.play();
            $scope.isStreaming = true;
        });
    };

    $scope.stopSong = function(sound) {
        sound.pause();
    };

    var checkPlay = function () {
        if ($scope.clock.now === $scope.alarm && !$scope.isStreaming) {
            $scope.startSong($scope.stream_url);
        }
    };

    $scope.trackSearch = 'Search';
    $scope.tracks = [];
    var page_size = 10;
    
    $scope.search = function() {
        SC.get('/tracks', { q: $scope.trackSearch, streamable: true, limit: page_size }, function(tracks) {
            $scope.tracks = tracks;
        });
    };

    $scope.nowPlaying = '';
    $scope.chooseTrack = function(track) {
        var pos = track.uri.indexOf('/tracks');
        $scope.stream_url = track.uri.slice(pos,track.uri.length);
        $scope.nowPlaying = track.title;
    };

    /* CLOCK */
    $scope.timeOfDay = '';
    $scope.alarm = '12:00 PM';
    $scope.clock = {
        clock : new Date()
    };

    var checkDay = function () {
        $scope.dayTime = $filter('date')(new Date(), 'a');
        if ($scope.dayTime === 'PM') {
            $scope.timeOfDay = 'How is your day?';
        } else {
            $scope.timeOfDay = 'Good Morning!';
        }
    };

    var updateClock = function () {
        $scope.clock.now = $filter('date')(new Date(), 'shortTime');
    };

    setInterval(function () {
        $scope.$apply(updateClock);
        $scope.$apply(checkPlay);
        $scope.$apply(checkDay);
    }, 1000);

        
  });