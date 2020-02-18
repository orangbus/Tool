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
var Logger = {};

///// Log Types //////
Logger.Types = {
    debug:"debug",
    info:"info",
    success:"success",
    warning:"warning",
    error:"error"
};

///// Event Types //////
Logger.events = {
    onLog:"log"
};

Logger.entries = [];
Logger.enabled = true;
Logger.logToConsole = true;
Logger.logAlert = false;
Logger.logStackTrace = false;
Logger.maxCapacity = 25;
Logger.listeners = [];

Logger.log = function log(message, type, logStackTrace) {
    if (!Logger.enabled)
        return;

    if (!type)
        type = Logger.Types.debug;

    if (logStackTrace == undefined)
        logStackTrace = Logger.logStackTrace;

    var time = new Date().toLocaleTimeString();
    var formattedMessage = Logger.format(message, type, time);
    var stackTrace = null;
    if (logStackTrace) {
        stackTrace = Logger.getStackTrace();
        formattedMessage += "\nStack Trace:\n" + stackTrace.join("\n");
    }

    var onLogListeners = Logger.listeners[Logger.events.onLog];
    if (onLogListeners != undefined) {
        for (var i in onLogListeners) {
            if (onLogListeners.hasOwnProperty(i)) {
                var fn = onLogListeners[i];
                try {
                    fn({ message:message, type:type, formattedMessage:formattedMessage });
                }
                catch (ex) {
                }
            }
        }
    }

    if (Logger.logToConsole) {
        switch (type) {
            case Logger.Types.debug:
                console.debug(formattedMessage);
                break;

            case Logger.Types.info:
            case Logger.Types.success:
                console.info(formattedMessage);
                break;

            case Logger.Types.warning:
                console.warn(formattedMessage);
                break;

            case Logger.Types.error:
                console.error(formattedMessage);
                break;

            default:
                console.log(formattedMessage);
                break;
        }
    }

    if (Logger.logAlert)
        alert(formattedMessage);

    if (Logger.entries.length >= Logger.maxCapacity)
        Logger.entries.shift();

    Logger.entries.push({ message:message, type:type, time:time, stackTrace:stackTrace });
};

Logger.getStackTrace = function getStackTrace() {
    var anonymous = "<anonymous>";
    var functionRegex = /function\s*([\w\-$]+)?\s*\(/i;
    var stack = [];
    var functions = [];
    var currentFunction = arguments.callee.caller.caller;
    while (currentFunction) {
        functions.push(currentFunction);

        var fn = functionRegex.test(currentFunction.toString()) ? RegExp.$1 || anonymous : anonymous;
        var args = stack.slice.call(currentFunction.arguments);
        var i = args.length;
        while (i--) {
            switch (typeof args[i]) {
                case "string":
                    args[i] = '"' + args[i].replace(/"/g, '\\"') + '"';
                    break;

                case "function":
                    args[i] = "function";
                    break;
            }
        }

        stack[stack.length] = fn + '(' + args.join(", ") + ')';
        currentFunction = currentFunction.caller;
        if (functions.indexOf(currentFunction) >= 0) {
            console.log("Recursion detected..");
            break;
        }
    }

    return stack;
};

Logger.format = function format(message, type, time) {
    if (!time)
        time = new Date().toLocaleTimeString();

    if (type && type != Logger.Types.debug)
        message = "[" + type + "] - " + message;

    message = "[" + time + "] " + message;
    return message;
};

Logger.toString = function toString() {
    var result = "";
    for (var i in Logger.entries) {
        if (Logger.entries.hasOwnProperty(i)) {
            var entry = Logger.entries[i];
            result += Logger.format(entry.message, entry.type, entry.time) + "\n";
            if (Logger.logStackTrace) {
                result += "Stack Trace:\n" + entry.stackTrace.join("\n") + "\n";
                result += "--------------------------------------------\n";
            }
        }
    }
    return result;
};

Logger.clear = function clear() {
    Logger.entries = [];
};

Logger.haveEntryOfType = function haveEntryOfType(type) {
    for (var i in Logger.entries) {
        if (Logger.entries.hasOwnProperty(i)) {
            if (Logger.entries[i].type == type)
                return true;
        }
    }
    return false;
};

Logger.haveErrorEntries = function haveErrorEntries() {
    return Logger.haveEntryOfType(Logger.Types.error);
};

Logger.addEventListener = function addEventListener(event, fn) {
    if (!Logger.listeners[event])
        Logger.listeners[event] = [];

    Logger.listeners[event].push(fn);
};
