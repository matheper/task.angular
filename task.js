var app = angular.module('task.app', ['ngResource']);

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('getTasks', ['$resource', function($resource) {
    var Tasks = $resource('http://127.0.0.1:5000/todo/api/v1.0/tasks');
    this.data = Tasks.get();

}]);


app.controller('TaskController', ['$resource', function($resource){
    var Tasks = $resource('http://127.0.0.1:5000/todo/api/v1.0/tasks');
    this.task = {};
    this.addTask = function(){
        Tasks.save(this.task);
        this.task = {}
        console.log($(this));
        console.log(app);
    }

}]);
