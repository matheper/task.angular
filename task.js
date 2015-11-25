var app = angular.module('task.app', ['ngResource']);

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('getTasks', ['$resource', function($resource) {
    Tasks = $resource('http://127.0.0.1:5000/todo/api/v1.0/tasks');
    var tasks = Tasks.get(function () {
    });
    this.data = tasks;
}]);
