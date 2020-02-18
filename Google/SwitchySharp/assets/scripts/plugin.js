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
var memoryPath = ':memory:';
var ProxyPlugin = {};
ProxyPlugin.memoryPath = memoryPath;
ProxyPlugin.proxyMode = Settings.getValue('proxyMode', 'direct');
ProxyPlugin.proxyServer = Settings.getValue('proxyServer', '');
ProxyPlugin.proxyExceptions = Settings.getValue('proxyExceptions', '');
ProxyPlugin.proxyConfigUrl = Settings.getValue('proxyConfigUrl', '');
ProxyPlugin.autoPacScriptPath = Settings.getValue('autoPacScriptPath', '');
ProxyPlugin.mute = false;
ProxyPlugin.init = function () {
    if (chrome.experimental !== undefined && chrome.experimental.proxy !== undefined)
        ProxyPlugin._proxy = chrome.experimental.proxy;
    else if (chrome.proxy !== undefined)
        ProxyPlugin._proxy = chrome.proxy;
    else
        alert('Need proxy api support, please update your Chrome');
    ProxyPlugin._proxy.settings.onChange.addListener(ProxyPlugin.updateProxy);
    ProxyPlugin._proxy.settings.get({}, ProxyPlugin.updateProxy);
};

ProxyPlugin.updateProxy = function (config) {
    if (ProxyPlugin.mute) return;
    if (config.value) {
        config = config.value;
    }
    switch (config.mode) {
        case 'system':
            ProxyPlugin.proxyMode = Settings.setValue('proxyMode', 'system');
            ProxyPlugin.proxyServer = Settings.setValue('proxyServer', '');
            ProxyPlugin.proxyExceptions = Settings.setValue('proxyExceptions', '');
            ProxyPlugin.proxyConfigUrl = Settings.setValue('proxyConfigUrl', '');
            break;
        case 'direct':
            ProxyPlugin.proxyMode = Settings.setValue('proxyMode', 'direct');
            ProxyPlugin.proxyServer = Settings.setValue('proxyServer', '');
            ProxyPlugin.proxyExceptions = Settings.setValue('proxyExceptions', '');
            ProxyPlugin.proxyConfigUrl = Settings.setValue('proxyConfigUrl', '');
            break;
        case 'fixed_servers':
            ProxyPlugin.proxyMode = Settings.setValue('proxyMode', 'manual');
            var profile = {
                useSameProxy:false,
                proxyHttp:'',
                proxyHttps:'',
                proxyFtp:'',
                proxySocks:'',
                socksVersion:4
            };
            if (config.rules.singleProxy) {
                var proxyString = config.rules.singleProxy.host + ':' + config.rules.singleProxy.port;
                if (config.rules.singleProxy.scheme == 'http') {
                    profile.useSameProxy = true;
                    profile.proxyHttp = proxyString;
                }
                else {
                    switch (config.rules.singleProxy.scheme) {
                        case 'socks4':
                            profile.socksVersion = 4;
                            profile.proxySocks = proxyString;
                            break;
                        case 'socks5':
                            profile.socksVersion = 5;
                            profile.proxySocks = proxyString;
                            break;
                        case 'https':
                            profile.proxyHttps = proxyString;
                            break;
                    }
                }
            }
            else {
                if (config.rules.proxyForHttp) {
                    profile.proxyHttp = config.rules.proxyForHttp.host + ':' + config.rules.proxyForHttp.port;
                }
                if (config.rules.proxyForHttps) {
                    profile.proxyHttps = config.rules.proxyForHttps.host + ':' + config.rules.proxyForHttps.port;
                }
                if (config.rules.proxyForFtp) {
                    profile.proxyFtp = config.rules.proxyForFtp.host + ':' + config.rules.proxyForFtp.port;
                }
                if (config.rules.fallbackProxy) {
                    if (config.rules.fallbackProxy.scheme == 'socks4')
                        profile.socksVersion = 4;
                    else
                        profile.socksVersion = 5;
                    profile.proxySocks = config.rules.fallbackProxy.host + ':' + config.rules.fallbackProxy.port;
                }
            }
            ProxyPlugin.proxyServer = Settings.setValue('proxyServer', ProfileManager.buildProxyString(profile));
            profile = null;
            ProxyPlugin.proxyExceptions = Settings.setValue('proxyExceptions',
                config.rules.bypassList ? config.rules.bypassList.join(';') : '');
            ProxyPlugin.proxyConfigUrl = Settings.setValue('proxyConfigUrl', '');
            break;
        case 'pac_script':
            ProxyPlugin.proxyMode = Settings.setValue('proxyMode', 'auto');
            if (config.pacScript.url !== undefined) {
                ProxyPlugin.proxyConfigUrl = Settings.setValue('proxyConfigUrl', config.pacScript.url);
                ProxyPlugin.autoPacScriptPath = Settings.setValue('autoPacScriptPath', config.pacScript.url);
            }
            else {
                ProxyPlugin.proxyConfigUrl = Settings.setValue('proxyConfigUrl', memoryPath);
                ProxyPlugin.autoPacScriptPath = Settings.setValue('autoPacScriptPath', memoryPath);
            }
            break;
    }

    if (ProxyPlugin.updateProxyCallback != undefined) {
        ProxyPlugin.updateProxyCallback();
        ProxyPlugin.updateProxyCallback = undefined;
    }
    else if (Settings.getValue("monitorProxyChanges", true))
        setIconInfo(undefined, Settings.getValue("preventProxyChanges", false));

};

ProxyPlugin._parseProxy = function (str) {
    if (str) {
        var proxy = {scheme:'http', host:'', port:80};
        var t1 = null;
        var t = str.indexOf(']') + 1;
        if (t > 0) {
            t1 = new Array();
            t1.push(proxy.host = str.substr(0, t));
            if (t < str.length - 1)
                t1.push(str.substr(t + 1));
        }
        else {
            t1 = str.split(':');
            proxy.host = t1[0];
        }
        var t2 = proxy.host.split('=');
        if (t2.length > 1) {
            proxy.scheme = t2[0] == 'socks' ? 'socks4' : t2[0];
            proxy.host = t2[1];
        }
        if (t1.length > 1)
            proxy.port = parseInt(t1[1]);
        return proxy;
    }
    else
        return {}
};
ProxyPlugin.setProxy = function (proxyMode, proxyString, proxyExceptions, proxyConfigUrl) {
    var config;
    ProxyPlugin.proxyMode = Settings.setValue('proxyMode', proxyMode);
    ProxyPlugin.proxyServer = Settings.setValue('proxyServer', proxyString);
    ProxyPlugin.proxyExceptions = Settings.setValue('proxyExceptions', proxyExceptions);
    ProxyPlugin.proxyConfigUrl = Settings.setValue('proxyConfigUrl', proxyConfigUrl);
    switch (proxyMode) {
        case 'system':
            config = {mode:"system"};
            break;
        case 'direct':
            config = {mode:"direct"};
            break;
        case 'manual':
            var tmpbypassList = [];
            var proxyExceptionsList = ProxyPlugin.proxyExceptions.split(';');
            var proxyExceptionListLength = proxyExceptionsList.length;
            for (var i = 0; i < proxyExceptionListLength; i++) {
                tmpbypassList.push(proxyExceptionsList[i].trim())
            }
            proxyExceptionsList = null;
            var profile = ProfileManager.parseProxyString(proxyString);
            if (profile.useSameProxy) {
                config = {
                    mode:"fixed_servers",
                    rules:{
                        singleProxy:ProxyPlugin._parseProxy(profile.proxyHttp),
                        bypassList:tmpbypassList
                    }
                };
            }
            else {
                var socksProxyString;
                if (profile.proxySocks && !profile.proxyHttp && !profile.proxyFtp && !profile.proxyHttps) {
                    socksProxyString = profile.socksVersion == 4 ? 'socks=' + profile.proxySocks : 'socks5=' + profile.proxySocks;
                    config = {
                        mode:"fixed_servers",
                        rules:{
                            singleProxy:ProxyPlugin._parseProxy(socksProxyString),
                            bypassList:tmpbypassList
                        }
                    }

                }
                else {
                    config = {
                        mode:"fixed_servers",
                        rules:{
                            bypassList:tmpbypassList
                        }
                    };
                    if (profile.proxySocks) {
                        socksProxyString = profile.socksVersion == 4 ? 'socks=' + profile.proxySocks : 'socks5=' + profile.proxySocks;
                        config.rules.fallbackProxy = ProxyPlugin._parseProxy(socksProxyString);
                    }
                    if (profile.proxyHttp)
                        config.rules.proxyForHttp = ProxyPlugin._parseProxy(profile.proxyHttp);
                    if (profile.proxyFtp)
                        config.rules.proxyForFtp = ProxyPlugin._parseProxy(profile.proxyFtp);
                    if (profile.proxyHttps)
                        config.rules.proxyForHttps = ProxyPlugin._parseProxy(profile.proxyHttps);
                }
            }
            tmpbypassList = null;
            break;
        case 'auto':
            if (ProxyPlugin.proxyConfigUrl == memoryPath) {
                config = {
                    mode:"pac_script",
                    pacScript:{
                        data:Settings.getValue('pacScriptData', '')
                    }
                };
                Settings.setValue('pacScriptData', '');
            }
            else {
                config = {
                    mode:"pac_script",
                    pacScript:{
                        url:ProxyPlugin.proxyConfigUrl
                    }
                }
            }
            break;
    }
    ProxyPlugin.mute = true;
    ProxyPlugin._proxy.settings.set({'value':config}, function () {
        ProxyPlugin.mute = false;
        if (ProxyPlugin.setProxyCallback != undefined) {
            ProxyPlugin.setProxyCallback();
            ProxyPlugin.setProxyCallback = undefined;
        }
    });
    profile = null;
    config = null;
    return 0;
};
ProxyPlugin.writeAutoPacFile = function (script) {
    ProxyPlugin.autoPacScriptPath = Settings.setValue('autoPacScriptPath', memoryPath);
    Settings.setValue('pacScriptData', script);
    return 0;
};