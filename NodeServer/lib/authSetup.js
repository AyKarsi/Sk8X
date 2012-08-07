var everyauth = require("everyauth");

everyauth.password
    .getLoginPath("/client/src/index.html#login")
    .postLoginPath("/login")
    .authenticate(function(login,password){
        console.log("logging in " + login+ " " +  password);
        var promise = this.Promise();
        var query = User.where('username').equals(login);//.where('password').equals(password);
        query.exec(function(err, user){
            if (err) return promise.fulfill([err]);
            if (user && user.length > 0 && user[0].comparePasswords(password))
                promise.fulfill(user[0]);
        });
        return promise;
    })
    .respondToLoginSucceed( function (res, user, data) {

        var loggedIn =everyauth._req._getters.loggedIn();
        console.log("respondToLoginSucceed " +loggedIn + " "+  everyauth.user);

        if (user) {
            everyauth.user = user;
            //response.login = true;
            return res.json({ success: true }, 200);
        }
        //this.redirect(res);
    })
    .handleLogout( function (req, res) {

        everyauth.user = null;
        return res.json({ success: true }, 200);

    })
    .respondToLoginFail( function (req, res, errors, login) {
        if (!errors || !errors.length) return;
        return res.json({ success: false, errors: errors });
    })
    .getRegisterPath('/client/src/index.html#register') // Uri path to the registration page
    .postRegisterPath('/register') // The Uri path that your registration form POSTs to
    .registerUser(function(newUserAttributes){
        // This step is only executed if we pass the validateRegistration step without
        // any errors.
        //
        // Returns a user (or a Promise that promises a user) after adding it to
        // some user store.
        //
        // As an edge case, sometimes your database may make you aware of violation
        // of the unique login index, so if this error is sent back in an async
        // callback, then you can just return that error as a single element array
        // containing just that error message, and everyauth will automatically handle
        // that as a failed registration. Again, you will have access to this error via
        // the `errors` local in your register view jade template.
        // e.g.,
        // var promise = this.Promise();
        // User.create(newUserAttributes, function (err, user) {
        //   if (err) return promise.fulfill([err]);
        //   promise.fulfill(user);
        // });
        // return promise;
        //
        // Note: Index and db-driven validations are the only validations that occur
        // here; all other validations occur in the `validateRegistration` step documented above.
    })
    .registerSuccessRedirect('/client/src/index.html');


;
