//app.use('/api', mers({uri:'"mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02"'}).rest());
module.exports = require("mers")({

    uri:'"mongodb://localhost:27017/Ska8x"',
    transformers:{
        publicUser:function () {
            return function (obj) {
                var o = obj.toObject();
                delete o.email;
                delete o.password;
                return o;
            }
        }
    }
});