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


        this.isLoggedIn = function(){
            if (this.currentUser != null)
                return true;
            return false;
        }

        this.currentUser = null;
        this.doLogin = function (opts){
            this.currentUser = null;
            $.ajax({
                url: config.apiUrl+"login",
                type:'POST',
                data: {
                    login:opts.username,
                    password:opts.password
                },
                success:_.bind(function(data) {
                    if (data.success == true){
                        this.currentUser = data.user;
                        opts.successCallback();
                        return;
                    }
                    opts.errorCallback();
                },this),
                error: opts.errorCallback
            });
        };

    }
});