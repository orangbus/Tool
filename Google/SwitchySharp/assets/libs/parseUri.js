///////////////////////////////////////////////////////////////////////////
//   parseUri 1.2.2                                                      //
//   (c) Steven Levithan <stevenlevithan.com>                            //
//   MIT License                                                         //
///////////////////////////////////////////////////////////////////////////

function parseUri(str) {
    var options = parseUri.options;
    var matches = options.parser[options.strictMode ? "strict" : "loose"].exec(str);
    var uri = {};
    var i = 14;

    while (i--) {
        uri[options.key[i]] = matches[i] || "";
    }
    uri[options.query.name] = {};
    uri[options.key[12]].replace(options.query.parser, function ($0, $1, $2) {
        if ($1)
            uri[options.query.name][$1] = $2;
    });

    return uri;
}
parseUri.options = {
    strictMode:false,
    key:[ "source", "protocol", "authority", "userInfo", "user", "password",
        "host", "port", "relative", "path", "directory", "file", "query",
        "anchor" ],
    query:{
        name:"queryKey",
        parser:/(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser:{
        strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

