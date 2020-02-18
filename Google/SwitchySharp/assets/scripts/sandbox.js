window.shExpMatch = function shExpMatch(url, pattern) {
    var pCharCode;
    var isAggressive = false;
    var pIndex;
    var urlIndex = 0;
    var lastIndex;
    var patternLength = pattern.length;
    var urlLength = url.length;
    for (pIndex = 0; pIndex < patternLength; pIndex += 1) {
        pCharCode = pattern.charCodeAt(pIndex); // use charCodeAt for performance, see http://jsperf.com/charat-charcodeat-brackets
        if (pCharCode === 63) { // use if instead of switch for performance, see http://jsperf.com/switch-if
            if (isAggressive) {
                urlIndex += 1;
            }
            isAggressive = false;
            urlIndex += 1;
        }
        else if (pCharCode === 42) {
            if (pIndex === patternLength - 1) {
                return urlIndex <= urlLength;
            }
            else {
                isAggressive = true;
            }
        }
        else {
            if (isAggressive) {
                lastIndex = urlIndex;
                urlIndex = url.indexOf(String.fromCharCode(pCharCode), lastIndex + 1);
                if (urlIndex < 0) {
                    if (url.charCodeAt(lastIndex) !== pCharCode) {
                        return false;
                    }
                    urlIndex = lastIndex;
                }
                isAggressive = false;
            }
            else {
                if (urlIndex >= urlLength || url.charCodeAt(urlIndex) !== pCharCode) {
                    return false;
                }
            }
            urlIndex += 1;
        }
    }
    return urlIndex === urlLength;
};

window.regExpMatch = function regExpMatch(url, pattern) {
    var regexp = new RegExp(pattern);
    return regexp.test(url);
};
window.u2p = function(url, host) {
    return 'direct';
};

window.addEventListener("message", function (e) {
  if (typeof e.data.u2p !== "undefined") {
    try {
      window.u2p = eval(e.data.u2p);
    } catch (e) {
      console.log(e);
    }
  } else if (typeof e.data.match !== "undefined") {
    var profileId = u2p(e.data.match.url, e.data.match.host);
    e.source.postMessage({"reqid": e.data.reqid, "profileId": profileId}, "*");
  }
}, false);