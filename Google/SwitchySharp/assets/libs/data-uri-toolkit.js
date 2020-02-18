/*
 * JavaScript data: URI toolkit
 * 2010-11-06
 * 
 * By Eli Grey, http://eligrey.com
 *
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

// Update: The data: URI parser at http://shadow2531.com/opera/testcases/datauri/parse_data_uri.html
// seems much more fully featured and compliant.

"use strict";

var dataURI = {
    parse:function (uri) {
        var
            dataSeparator = uri.indexOf(",")
            , meta = uri.slice(5, dataSeparator)
        // 'data:'.length == 5
            , type = meta.match(/^\s*(\S*?)\s*(?:;|$)/)
            , charset = meta.match(/;\s*charset=(\S*?)\s*(?:;|$)/i)
            , data = decodeURIComponent(uri.slice(dataSeparator + 1))
            ;
        if (uri.slice(0, 5).toLowerCase() !== "data:" || dataSeparator === -1) {
            throw new URIError("Invalid data: URI");
        }
        if (/;?\s*base64\s*(?:;|$)/i.test(meta)) {
            data = atob(data);
        }
        return {
            data:data, type:type ? type[1] : "", charset:charset ? charset[1] : null
        };
    }, decode:function (uri) {
        if (typeof uri === "string") {
            uri = this.parse(uri);
        }
        var
            charset = uri.charset
            , data
            ;
        if (charset) {
            // Only support UTF-8 decoding
            if (charset.toUpperCase() === "UTF-8") {
                data = decodeURIComponent(escape(uri.data));
            } else {
                throw new Error("Unsupported character encoding: " + charset);
            }
        } else {
            data = uri.data;
        }
        return {
            data:data, type:uri.type
        };
    }, create:function (opts) {
        var
            uri = "data:" + ("type" in opts ? opts.type : "")
            , charset = opts.charset
            , data = opts.data
            ;
        if (charset) {
            // Only support UTF-8 encoding
            if (charset.toUpperCase() === "UTF-8") {
                data = unescape(encodeURIComponent(data));
            } else {
                throw new Error("Unsupported character encoding: " + charset);
            }
            uri += ";charset=" + charset;
        }
        if (opts.base64) {
            uri += ";base64," + btoa(data);
        } else {
            uri += "," + encodeURIComponent(data);
        }
        return uri;
    }
};