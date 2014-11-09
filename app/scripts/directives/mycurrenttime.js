'use strict';

/**
 * @ngdoc directive
 * @name alarmApp.directive:myCurrentTime
 * @description
 * # myCurrentTime
 */
angular.module('alarmApp')
  .directive('myCurrentTime', function(dateFilter){
    return function($scope, element, attrs){
        var format;
        
        $scope.$watch(attrs.myCurrentTime, function(value) {
            format = value;
            updateTime();
        });
        
        function updateTime(){
            var dt = dateFilter(new Date(), format);
            element.text(dt);
        }
        
        function updateLater() {
            setTimeout(function() {
              updateTime(); // update DOM
              updateLater(); // schedule another update
            }, 1000);
        }
        
        updateLater();
    };
});
