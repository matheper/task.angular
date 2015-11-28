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
    this.TaskAPI = $resource;
    this.tasks = this.TaskAPI(baseURL).get();
    this.task = {};

    this.getTasks = function(tStatus){
        console.log(tStatus);
        var url = baseURL;
        if (typeof tStatus !== 'undefined')
            url += tStatus;
        this.tasks = this.TaskAPI(url).get();
    };

    this.addTask = function(tStatus){
        this.task['status'] = tStatus;
        this.TaskAPI(baseURL).save(this.task)
        this.task = {};
        this.getTasks(tStatus);
    };

    this.delTask = function(task, tStatus){
        this.TaskAPI(task['uri']).remove();
        this.getTasks(tStatus);
    };

    this.updateTask = function(task, tStatus){
        var taskURI = task['uri'];
        var currentStatus = task['status'];
        this.TaskAPI(taskURI, null, {
            update: { method: 'PUT' }
        }).update({"status":tStatus})
        this.getTasks(currentStatus);
    };
}]);


app.controller('TabController', function(){
    this.tab = 3;
    this.tabs = ['all', 'todo', 'today', 'done'];

    this.selectTab = function(setTab){
        this.tab = setTab;
    };

    this.isSelected = function(checkTab){
        return this.tab === checkTab;
    };

    this.getSelected = function(){
        selected = taskStatus[this.tab] || '';
        return selected;
    };
});
