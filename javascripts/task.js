var app = angular.module('task.app', ['ngResource']);
var baseURL = 'http://taskflask-matheper.rhcloud.com/todo/api/v1.0/tasks/';
var taskStatus = ['todo', 'today', 'done'];

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


app.controller('TaskController', ['$resource', '$scope', function($resource, $scope){
    this.TaskAPI = $resource;
    this.tasks = this.TaskAPI(baseURL).get();
    this.task = {};

    this.getTasks = function(tStatus){
        var url = baseURL;
        if (tStatus)
            url += tStatus;
        this.tasks = this.TaskAPI(url).get();
    };

    this.addTask = function(tStatus){
        if (tStatus)
            this.task['status'] = tStatus;
        this.TaskAPI(baseURL).save(this.task).$promise.then(function(){
            $scope.taskCtrl.getTasks(tStatus);
            $scope.taskCtrl.task = {};
        });
    };

    this.delTask = function(task, tStatus){
        this.TaskAPI(task['uri']).remove().$promise.then(function(){
            $scope.taskCtrl.getTasks(tStatus);
        });
    };

    this.updateTask = function(task, tStatus, currentStatus){
        var taskURI = task['uri'];
        this.TaskAPI(taskURI, null, { update: { method: 'PUT' } }).update(
            {"status":tStatus}).$promise.then(function(){
                $scope.taskCtrl.getTasks(currentStatus);
            }
        );
    };
}]);


app.controller('TabController', function(){
    this.tab = -1;
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
