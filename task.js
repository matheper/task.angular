var app = angular.module('task.app', ['ngResource']);
var baseURL = 'http://127.0.0.1:5000/todo/api/v1.0/tasks/'
var taskStatus = ['todo', 'today', 'done'];

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


app.controller('TaskController', ['$resource', function($resource){
    var TaskAPI = $resource(baseURL);
    this.tasks = TaskAPI.get();
    this.task = {};

    this.addTask = function(){
        TaskAPI.save(this.task);
        this.task = {};
        this.tasks = TaskAPI.get();
    };

    this.getTasks = function(tStatus){
        var url = baseURL;
        if (typeof tStatus !== 'undefined')
            url += taskStatus[tStatus];
        console.log(url);
        this.tasks = $resource(url).get();
        console.log(this.tasks);
    };

    this.delTask = function(taskURI){
        $resource(taskURI).remove();
        this.tasks = TaskAPI.get();
    };

    this.changeTaskStatus = function(taskURI, taskStatus){
        $resource(taskURI, null, {
            update: { method: 'PUT' }
        }).update({"status":taskStatus});
        this.tasks = TaskAPI.get();
    };
}]);

app.controller('TabController', function(){
    this.tab = 1;

    this.selectTab = function(setTab){
        this.tab = setTab;
    };

    this.isSelected = function(checkTab){
        return this.tab === checkTab;
    };
});
