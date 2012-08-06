var Models = require("./models");
var util = require("util");


exports.isAuthenticated = function(req)
{
    if (!req.session) return false;
    var userid = req.session.userid;

    return userid!=null;
};

exports.setAuth = function(req, userid, username)
{
    if (arguments.length!=3) throw "auth.setAuth() called with invalid arguments";
    req.session.userid = userid;
    req.session.username = username;
}

exports.clearAuth = function(req)
{
    if (arguments.length!=1) throw "auth.setAuth() called with invalid arguments";
    req.session.userid = req.session.username = null;
}


exports.protectUrls = function(whitelist, blacklist)
{
    return function(req, res, next)
    {
        if (exports.isAuthenticated(req))
        {
            next();
            return;
        }

        var url = req.originalUrl;
        for(var x = 0; x<whitelist.length; x++)
        {
            if (url.match(whitelist[x]))
            {
                console.log("Whitelisted by "+whitelist[x]);
                next();
                return;
            }
        }

        for (var x = 0; x<blacklist.length; x++)
        {
            if (url.match(blacklist[x]))
            {
                var str = "Blacklisted by "+blacklist[x];
                console.log(str);
                res.end(str)
                return;
            }
        }

        console.log("No white/blacklist");
        next();
    }
}
