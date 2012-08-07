define([
    'jquery',
    'underscore',
    'backbone'
], function ($,_,Backbone) {

    window.AuthController = function(){

        this.init = function () {
        };
        this.init();

        this.register = function(callback){
            var model = new User({});
            //model.set('_id', model.cid);
            var spotView = new RegisterUserView({model: model});
            callback(spotView);
        };

        this.login = function(callback){
            var model = new User({});
            //model.set('_id', model.cid);
            var loginView = new LoginUserView({model: model});
            callback(loginView);
        };

        this.doLogin = function (username,callback){

        };

    }
});