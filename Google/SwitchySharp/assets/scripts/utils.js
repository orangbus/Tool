/*
 Copyright (c) 2011 Shyc2001 (http://twitter.com/shyc2001)
 This work is based on:
 *"Switchy! Chrome Proxy Manager and Switcher" (by Mohammad Hejazi (mohammadhi at gmail d0t com))
 *"SwitchyPlus" by @ayanamist (http://twitter.com/ayanamist)

 This file is part of SwitchySharp.
 SwitchySharp is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 SwitchySharp is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with SwitchySharp.  If not, see <http://www.gnu.org/licenses/>.
 */
var Utils = {};

Utils.OS = {
    isMac:(/mac/i).test(navigator.userAgent), // maybe should test |navigator.platform| instead?
    isWindows:(/win/i).test(navigator.userAgent),
    isLinux:(/linux/i).test(navigator.userAgent)
};

Utils.compareStrings = function compareStrings(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    var length = Math.min(s1.length, s2.length);
    for (var i = 0; i < length; i++) {
        var ch1 = s1.charCodeAt(i);
        var ch2 = s2.charCodeAt(i);
        if (ch1 != ch2)
            return ch1 - ch2;
    }

    return s1.length - s2.length;
};

Utils.compareNamedObjects = function compareNamedObjects(o1, o2) {
    return Utils.compareStrings(o1.name, o2.name);
};
