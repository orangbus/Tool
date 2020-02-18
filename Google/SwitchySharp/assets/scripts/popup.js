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
var extension;

var activeTabDomain = null;

var autoEnabled = false;

function init() {
    extension = chrome.extension.getBackgroundPage();
    App = extension.App;
    ProfileManager = extension.ProfileManager;
    RuleManager = extension.RuleManager;
    Settings = extension.Settings;
    Utils = extension.Utils;
    I18n = extension.I18n;
    autoEnabled = RuleManager.isEnabled();
    I18n.process(document);
    document.body.style.visibility = "visible";

    buildMenuItems();
    initUI();
}
function showTempRule() {
    $("#divDomain").remove();
    $("#menuAddTempRule").show();
}
function initUI() {
    $("#about, #addRule .close").click(closePopup);

    $(".versionNumber").text(App.version);

    // Reverse buttons order on Linux and Mac OS X
    if (!Utils.OS.isWindows) {
        var btnSaveContainer = $("#btnSave").parent();
        btnSaveContainer.next().next().insertBefore(btnSaveContainer);
        btnSaveContainer.next().insertBefore(btnSaveContainer);
    }
}

function quickSwitchProxy() {
    extension = chrome.extension.getBackgroundPage();
    ProfileManager = extension.ProfileManager;
    Settings = extension.Settings;

    if (!Settings.getValue("quickSwitch", false) && typeof(chrome.flag) == 'undefined')
        return;

    var profile = undefined;
    var currentProfile = ProfileManager.getCurrentProfile();
    var quickSwitchProfiles = Settings.getObject("quickSwitchProfiles") || [];

    var sel = false;
    for (var i in quickSwitchProfiles) {
        if (quickSwitchProfiles.hasOwnProperty(i)) {
            if (sel) {
                sel = false;
                profileId = quickSwitchProfiles[i];
                break;
            }
            if (quickSwitchProfiles[i] == currentProfile.id) {
                sel = true;
            }
        }
    }
    if (sel || typeof(profileId) == "undefined") {
        profileId = quickSwitchProfiles[0];
    }

    if (profileId == ProfileManager.directConnectionProfile.id) {
        profile = ProfileManager.directConnectionProfile;
    }
    else if (profileId == ProfileManager.systemProxyProfile.id) {
        profile = ProfileManager.systemProxyProfile;
    }
    else if (profileId == ProfileManager.autoSwitchProfile.id) {
        profile = ProfileManager.autoSwitchProfile;
    }
    else {
        profile = ProfileManager.getProfile(profileId);
    }

    if (profile == undefined) {
        return;
    }

    window.stop();

    ProfileManager.applyProfile(profile);
    extension.setIconInfo(profile);

    window.close();
    refreshTab();
}

function closePopup() {
    window.close();
}

function refreshTab() {
    if (Settings.getValue("refreshTab", false))
        chrome.tabs.executeScript(null, { code:"history.go(0);" });
}

function openOptions() {
    closePopup();
    extension.openOptions();
}

function openMainWebsite() {
    closePopup();
    chrome.tabs.create({
        url:'http://www.samabox.com/projects/chrome/switchy'
    });
}

function openPlusWebsite() {
    closePopup();
    chrome.tabs.create({
        url:'http://code.google.com/p/switchyplus'
    });
}

function openSupportWebsite() {
    closePopup();
    chrome.tabs.create({
        url:'http://code.google.com/p/switchysharp/issues/list'
    });
}

function showAbout() {
    var currentBodyDirection = document.body.style.direction;	// ....workaround for a Chrome bug
    document.body.style.direction = "ltr";						// ....prevents resizing the popup
    $("#about").css("visibility", "hidden");					// ....

    $("#menu").hide();
    $("#about").show();
    $(document.body).height($("#about").height());
    $(window).height($("#about").height());

    document.body.style.direction = currentBodyDirection;		// ....if the body's direction is "rtl"
    $("#about").css("visibility", "visible");					// ....
}

function showAddRule() {
    var lastProfileId = Settings.getValue("quickRuleProfileId", -1);
    var lastPatternType = Settings.getValue("quickRulePatternType", RuleManager.PatternTypes.wildcard);
    if (lastPatternType == "regex") // backward compatibility
        lastPatternType = RuleManager.PatternTypes.regexp;

    var combobox = $("#cmbProfileId");
    var profiles = ProfileManager.getSortedProfileArray();
    var directProfile = ProfileManager.directConnectionProfile;

    var item = $("<option>").attr("value", directProfile.id).text(directProfile.name);
    item[0].profile = directProfile;
    combobox.append(item);

    $.each(profiles, function (key, profile) {
        var item = $("<option>").attr("value", profile.id).text(profile.name);
        item[0].profile = profile;
        if (lastProfileId == profile.id)
            item.attr("selected", "selected");
        combobox.append(item);
    });

    $("#cmbPatternType option[value='" + lastPatternType + "']").attr("selected", "selected");
    $("#txtUrlPattern, #cmbPatternType").change(function () {
        var patternField = $("#txtUrlPattern");
        var patternTypeField = $("#cmbPatternType option:selected");
        if (this.id == "cmbPatternType") {
            var previousPatternType;
            if (patternTypeField.val() == RuleManager.PatternTypes.regexp)
                previousPatternType = RuleManager.PatternTypes.wildcard;
            else
                previousPatternType = RuleManager.PatternTypes.regexp;

            if (patternField.val() == RuleManager.domainToRule(activeTabDomain, previousPatternType).urlPattern)
                patternField.val(RuleManager.domainToRule(activeTabDomain, patternTypeField.val()).urlPattern);
        }

        if (RuleManager.ruleExists(patternField.val(), patternTypeField.val())) {
            $("#addRule .note").show();
            patternField.addClass("invalid");
        } else {
            $("#addRule .note").hide();
            patternField.removeClass("invalid");
        }

    }).keyup(function () {
            $(this).change();
        });

    var rule = RuleManager.domainToRule(activeTabDomain, $("#cmbPatternType option:selected").val());
    $("#addRule")[0].rule = rule;
    $("#txtUrlPattern").val(rule.urlPattern).change();
    $("#txtRuleName").val(rule.name);
    $("#txtRuleName").focus().select();

    var currentBodyDirection = document.body.style.direction;	// ....workaround for a Chrome bug
    document.body.style.direction = "ltr";						// ....prevents resizing the popup
    $("#addRule").css("visibility", "hidden");					// ....

    $("#menu").hide();
    $("#addRule").show();
    $(document.body).height($("#addRule").height());
    $(window).height($("#addRule").height());

    document.body.style.direction = currentBodyDirection;		// ....if the body's direction is "rtl"
    $("#addRule").css("visibility", "visible");					// ....
}

function addSwitchRule() {
    closePopup();
    var rule = $("#addRule")[0].rule;
    rule.name = $("#txtRuleName").val();
    rule.urlPattern = $("#txtUrlPattern").val();
    rule.patternType = $("#cmbPatternType option:selected").val();
    rule.profileId = $("#cmbProfileId option:selected")[0].profile.id;
    RuleManager.addRule(rule);

    // notify 'Options' tabs
    try {
        var tabs = chrome.extension.getExtensionTabs();
        for (var i in tabs) {
            if (tabs.hasOwnProperty(i)) {
                var tab = tabs[i];
                if (tab.location.pathname == "/options.html") {
                    tab.loadOptions();
                }
            }
        }
    } catch (e) {
    }

    Settings.setValue("quickRuleProfileId", rule.profileId);
    Settings.setValue("quickRulePatternType", rule.patternType);

    refreshTab();
}

function clearMenuProxyItems() {
    $("#proxies .item").remove();
}

var addTempRule = function addTempRule() {
    var combobox = $("#cmbTempProfileId");
    closePopup();
    RuleManager.addTempRule(activeTabDomain, combobox.val());
    refreshTab();
};

function buildMenuProxyItems(currentProfile) {
    var profiles = ProfileManager.getSortedProfileArray();
    var pp = RuleManager.LastProfile;
    var menu = $("#proxies");
    var templateItem = $("#proxies .templateItem");
    var combobox = $("#cmbTempProfileId");
    var item;
    combobox.change(addTempRule);
    for (var i in profiles) {
        if (profiles.hasOwnProperty(i)) {
            var profile = profiles[i];
            item = templateItem.clone().attr({
                "id":profile.id || profile.name,
                "name":profile.name,
                "title":ProfileManager.profileToString(profile, true),
                "class":"item proxy " + profile.color
            });
            $("span", item).text(profile.name);
            item.click(onSelectProxyItem);
            item[0].profile = profile;
            if (ProfileManager.equals(profile, currentProfile))
                item.addClass("checked");

            menu.append(item);

            if (autoEnabled && pp) {
                item = $("<option>").attr("value", profile.id).text(profile.name);
                item[0].profile = profile;
                if (pp.id == profile.id)
                    item.attr("selected", "selected");
                combobox.append(item);
            }
        }
    }

    $("#separatorProxies").show();

    if (currentProfile.unknown && currentProfile.proxyMode != ProfileManager.ProxyModes.direct) {
        item = templateItem.clone().attr({
            "id":currentProfile.id,
            "name":currentProfile.name,
            "title":ProfileManager.profileToString(currentProfile, true),
            "class":"item proxy checked"
        });
        $("span", item).text(currentProfile.name);
        item.click(onSelectProxyItem);
        item[0].profile = currentProfile;

        menu.append(item);

    } else if (profiles.length == 0) {
        $("#separatorProxies").hide();
    }
}

function buildMenuDirectConnectionItem(currentProfile) {
    var item = $("#directConnection");
    item.click(onSelectProxyItem);
    var profile = ProfileManager.directConnectionProfile;
    item[0].profile = profile;
    if (currentProfile.proxyMode == ProfileManager.ProxyModes.direct)
        item.addClass("checked");
    else if (autoEnabled) {
        item = $("<option>").attr("value", profile.id).text(profile.name);
        item[0].profile = profile;
        $("#cmbTempProfileId").append(item);
    }
}

function buildMenuSystemProxyItem(currentProfile) {
    var item = $("#systemProxy");
    item.click(onSelectProxyItem);
    item[0].profile = ProfileManager.systemProxyProfile;
    if (currentProfile.proxyMode == ProfileManager.ProxyModes.system)
        item.addClass("checked");
}

function buildMenuAutomaticModeItem(currentProfile) {
    var item = $("#automaticMode");
    if (autoEnabled && (activeTabDomain = RuleManager.LastDomain)) {
        $("#spanDomain").text(activeTabDomain);
    }
    else {
        $("#menuAddRule, #divDomain").hide();
        if (!autoEnabled) {
            item.hide();
            return;
        }
    }
    var autoProfile = RuleManager.getAutomaticModeProfile();
    item.click(onSelectProxyItem);
    item[0].profile = autoProfile;
    if (RuleManager.isAutomaticModeEnabled(currentProfile)) {
        item.addClass("checked");
        delete currentProfile.unknown; // to prevent adding <current profile> item.
    }
}

function buildMenuItems() {
    var currentProfile = ProfileManager.getCurrentProfile();
    clearMenuProxyItems();
    buildMenuDirectConnectionItem(currentProfile);
    buildMenuSystemProxyItem(currentProfile);
    buildMenuAutomaticModeItem(currentProfile);
    buildMenuProxyItems(currentProfile);
}

function onSelectProxyItem() {
    if (!event || !event.target)
        return;

    var item = (event.target.id) ? $(event.target) : $(event.target.parentNode); // click on the item or its child?
    var profile = item[0].profile;

    ProfileManager.applyProfile(profile);
    extension.setIconInfo(profile);

    closePopup();

    $("#menu .item").removeClass("checked");
    item.addClass("checked");

    if (profile.isAutomaticModeProfile)
        checkRulesFirstTimeUse();
    refreshTab();
}

function checkRulesFirstTimeUse() {
    if (!Settings.keyExists("rulesFirstTime")) {
        Settings.setValue("rulesFirstTime", ";]");
        if (!RuleManager.hasRules()) {
            var url = "options.html?rulesFirstTime=true&tab=rules";
            chrome.tabs.create({ url:url });
        }
    }
}

$(document).ready(function(){
    init();
    quickSwitchProxy();
    $("#menuAddRule").click(showAddRule);
    $("#divDomain").click(showTempRule);
    $("#menuOptions").click(openOptions);
    $("#menuAbout").click(showAbout);
    $("#openMainWebsite").click(openMainWebsite);
    $("#openPlusWebsite").click(openPlusWebsite);
    $("#openSupportWebsite").click(openSupportWebsite);
    $("#btnSave").click(addSwitchRule);
    $("#btnCancel").click(closePopup);
});