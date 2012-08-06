var fs = require("fs");

function extractFilename(filename)
{
    var index = filename.lastIndexOf('\\');
    return filename.substring(index+1);
}

module.exports = function(filename)
{
    var name = extractFilename(filename);
    return function(msg)
    {
        console.log(name+"> "+msg);
    };
}