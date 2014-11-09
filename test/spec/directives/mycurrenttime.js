'use strict';

describe('Directive: myCurrentTime', function () {

  // load the directive's module
  beforeEach(module('alarmApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-current-time></my-current-time>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myCurrentTime directive');
  }));
});
