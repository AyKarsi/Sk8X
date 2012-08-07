module.exports = function(app){
    app.get('/', function(req, res){

        console.log("everyauth "+ everyauth.loggedIn);
        console.log(req.loggedIn);
        res.send('<form method="post" enctype="multipart/form-data">'
            + '<p>1111: <input type="file" name="image" /></p>'
            + '<p><input type="submit" value="Upload" /></p>'
            + '</form>');
    });


    /*
     app.get('/push', function(req, res){
     console.log("pushing");
     count++;
     io.sockets.emit('news',{count:count});
     res.send(count);

     });
     */

    app.post('/fileupload', function(req, res, next){

        //http://www.hacksparrow.com/handle-file-uploads-in-express-node-js.html
        console.log(req.body);
        console.log(req.files);

        res.send({msg:'success'}) ;

        return;


    });
}