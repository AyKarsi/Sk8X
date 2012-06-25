var http = require('http');
module.exports = {

    setUp: function (callback) {
        //db.init(callback);
        console.log("test init")
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testCreateTestUsers: function (test)
    {

        console.log("----testCreateTestUsers");


        var post_data = {
            _id:"xxx",
            username:'TestCreateFromClient',
            pos:[0,123]
        };

        // http.request settings
        var settings = {
            host: "localhost",
            port: 99,
            path: '/api/users',
            //headers: options.headers || {},
            headers: {},
            method: 'POST'
        };

        var params = JSON.stringify(post_data);
        settings.headers['Content-Type'] = 'application/json';
        settings.headers['Content-Length'] = params.length;

        // MAKE THE REQUEST
        var req = http.request(settings);

        // if there are params: write them to the request
        if(params){ req.write(params) };

        // when the response comes back
        req.on('response', function(res){
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.body = '';
            res.setEncoding('utf-8');

            // concat chunks
            res.on('data', function(chunk){ res.body += chunk });

            // when the response has finished
            res.on('end', function(){

                console.log('response ' +res.body);
                test.done();
            });
        });


        req.end();


    },
    testUpdateTestUsers: function (test)
    {

        console.log("----testUpdateTestUsers");
        var post_data = {
            _id:"4fe3773ffca7f74410000002",
            username:'TestUpdateFromClient',
            pos:[0,3444]
        };

        // http.request settings
        var settings = {
            host: "localhost",
            port: 99,
            path: '/api/users/'+post_data._id,
            //headers: options.headers || {},
            headers: {},
            method: 'PUT'
        };

        var params = JSON.stringify(post_data);
        settings.headers['Content-Type'] = 'application/json';
        settings.headers['Content-Length'] = params.length;

        // MAKE THE REQUEST
        var req = http.request(settings);

        // if there are params: write them to the request
        if(params){ req.write(params) };

        // when the response comes back
        req.on('response', function(res){
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));

            res.body = '';
            res.setEncoding('utf-8');

            // concat chunks
            res.on('data', function(chunk){ res.body += chunk });

            // when the response has finished
            res.on('end', function(){

                console.log('response ' +res.body);
                test.done();
            });
        });


        req.end();


    }



};
