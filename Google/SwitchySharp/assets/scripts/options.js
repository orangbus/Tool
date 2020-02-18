/*
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
//var ProfileManager;
//var RuleManager;
//var Settings;
//var Logger;
//var Utils;
//var I18n;
var anyValueModified = false;
var ignoreFieldsChanges = false;
var selectedRow;
var selectedRuleRow;
var switchRulesEnabled;

function init() {
    extension = chrome.extension.getBackgroundPage();
    ProfileManager = extension.ProfileManager;
    RuleManager = extension.RuleManager;
    Settings = extension.Settings;
    Logger = extension.Logger;
    Utils = extension.Utils;
    I18n = extension.I18n;
    ProxyPlugin = extension.ProxyPlugin;

    I18n.process(document);
    document.body.style.visibility = "visible";

    initUI();
    loadOptions();
    checkPageParams();

    HelpToolTip.enableTooltips();
}

function initUI() {
    // Tab Control
    $("#tabsContainer div").click(function () {
        $("#tabsContainer div").removeClass("selected").addClass("normal");
        $(this).removeClass("normal").addClass("selected");
        $("#body .tab").hide();
        $("#" + $(this).attr("id") + "Body").show();
        if (this.id == "tabImportExport")
            $(".control").hide();
        else
            $(".control").show();
    });

    // Proxy Profiles
    $("#profileName").bind("keyup change", function () {
        $("td:first", selectedRow).text($(this).val()); // sync profile title changes
        selectedRow[0].profile.name = $(this).val();
        onFieldModified(true);
    });
    $("#modeManual, #modeAuto").change(function () {
        if ($("#modeManual").is(":checked")) {
            selectedRow[0].profile.proxyMode = ProfileManager.ProxyModes.manual;
            $("#httpRow, #sameProxyRow, #httpsRow, #ftpRow, #socksRow, #socksVersionRow").removeClass("disabled");
            $("#httpRow input, #sameProxyRow input, #httpsRow input, #ftpRow input, #socksRow input, #socksVersionRow input").removeAttr("disabled");
            $("#configUrlRow, #importPACButton").addClass("disabled");
            $("#configUrlRow input, #importPACButton").attr("disabled", "disabled");
            $("#useSameProxy").change();
        } else {
            selectedRow[0].profile.proxyMode = ProfileManager.ProxyModes.auto;
            $("#httpRow, #sameProxyRow, #httpsRow, #ftpRow, #socksRow, #socksVersionRow").addClass("disabled");
            $("#httpRow input, #sameProxyRow input, #httpsRow input, #ftpRow input, #socksRow input, #socksVersionRow input").attr("disabled", "disabled");
            $("#configUrlRow, #importPACButton").removeClass("disabled");
            $("#configUrlRow input, #importPACButton").removeAttr("disabled");
        }
        onFieldModified(true);
    });
    $("#httpProxyHost, #httpProxyPort").change(function () {
        selectedRow[0].profile.proxyHttp = joinProxy($("#httpProxyHost").val(), $("#httpProxyPort").val(), 80);
        onFieldModified(true);
    });
    $("#useSameProxy").change(function () {
        if ($(this).is(":checked")) {
            selectedRow[0].profile.useSameProxy = true;
            $("#httpsRow, #ftpRow, #socksRow, #socksVersionRow").hide();
//			$("#httpsRow, #ftpRow, #socksRow, #socksVersionRow").addClass("disabled");
//			$("#httpsRow input, #ftpRow input, #socksRow input, #socksVersionRow input").attr("disabled", "disabled");
        } else {
            selectedRow[0].profile.useSameProxy = false;
            $("#httpsRow, #ftpRow, #socksRow, #socksVersionRow").show();
//			$("#httpsRow, #ftpRow, #socksRow, #socksVersionRow").removeClass("disabled");
//			$("#httpsRow input, #ftpRow input, #socksRow input, #socksVersionRow input").removeAttr("disabled");
        }
        onFieldModified(true);
    });
    $("#httpsProxyHost, #httpsProxyPort").change(function () {
        selectedRow[0].profile.proxyHttps = joinProxy($("#httpsProxyHost").val(), $("#httpsProxyPort").val(), 443);
        onFieldModified(true);
    });
    $("#ftpProxyHost, #ftpProxyPort").change(function () {
        selectedRow[0].profile.proxyFtp = joinProxy($("#ftpProxyHost").val(), $("#ftpProxyPort").val(), 21);
        onFieldModified(true);
    });
    $("#socksProxyHost, #socksProxyPort").change(function () {
        selectedRow[0].profile.proxySocks = joinProxy($("#socksProxyHost").val(), $("#socksProxyPort").val(), 80);
        onFieldModified(true);
    });
    $("#socksV4, #socksV5").change(function () {
        selectedRow[0].profile.socksVersion = $("#socksV5").is(":checked") ? 5 : 4;
        onFieldModified(true);
    });
    $("#proxyExceptions").change(function () {
        selectedRow[0].profile.proxyExceptions = $(this).val();
        onFieldModified(true);
    });
    $("#proxyConfigUrl").change(function () {
        selectedRow[0].profile.proxyConfigUrl = $(this).val();
        onFieldModified(true);
    });

    // Switch Rules
    $("#cmbDefaultRuleProfile").change(function () {
        var rule = this.parentNode.parentNode.parentNode.rule;
        rule.profileId = $("option:selected", this)[0].profile.id;
        onFieldModified(false);
    });

    $("#chkSwitchRules").change(function () {
//		RuleManager.setEnabled($(this).is(":checked"));
        switchRulesEnabled = $(this).is(":checked");
        if ($(this).is(":checked")) {
            $("#switchRules *, #btnNewRule").removeClass("disabled");
            $("#switchRules input, #switchRules select").removeAttr("disabled");
            $("#chkRuleList").change();
        } else {
            $("#switchRules *, #btnNewRule").addClass("disabled");
            $("#switchRules input, #switchRules select").attr("disabled", "disabled");
        }
        onFieldModified(false);
    });

    $("#chkRuleList").change(function () {
        if ($(this).is(":checked")) {
            $("#ruleListsTable *, #autoProxy").removeClass("disabled");
            $("#ruleListsTable input, #ruleListsTable select, #autoProxy input").removeAttr("disabled");
        } else {
            $("#ruleListsTable *, #autoProxy").addClass("disabled");
            $("#ruleListsTable input, #ruleListsTable select, #autoProxy input").attr("disabled", "disabled");
        }
        onFieldModified(false);
    });

    $("#txtRuleListUrl, #cmbRuleListProfile, #cmbRuleListReload, #chkAutoProxy").change(function () {
        onFieldModified(false);
    });

    // Network
    $("#chkMonitorProxyChanges").change(function () {
        if ($(this).is(":checked"))
            $("#chkPreventProxyChanges").removeAttr("disabled").parent().removeClass("disabled");
        else
            $("#chkPreventProxyChanges").attr("disabled", "disabled").parent().addClass("disabled");
    });

    $("#chkMonitorProxyChanges, #chkPreventProxyChanges").change(function () {
        onFieldModified(false);
    });

    // Import-Export
    $("#txtBackupFilePath").bind("click keydown", function () {
        if ($(this).hasClass("initial"))
            $(this).removeClass("initial").val("");
    });

    // General
    $("#chkQuickSwitch").change(function () {
        if ($(this).is(":checked")) {
            $("#quickSwitchDiv ul").removeClass("disabled").sortable("enable");
        } else {
            $("#quickSwitchDiv ul").addClass("disabled").sortable("disable");
        }
        onFieldModified(false);
    });
    $("#quickSwitchDiv ul").sortable({
        connectWith:"#quickSwitchDiv ul",
        change:function () {
            onFieldModified(false);
        }
    }).disableSelection();


    $("#cmbStartupProfile").change(function () {
        onFieldModified(false);
    });

    $("#chkConfirmDeletion, #chkRefreshTab").change(function () {
        onFieldModified(false);
    });

    // Reverse buttons order on Linux and Mac OS X
    if (!Utils.OS.isWindows) {
        var btnSaveContainer = $("#btnSave").parent();
        btnSaveContainer.next().next().insertBefore(btnSaveContainer);
        btnSaveContainer.next().insertBefore(btnSaveContainer);
    }
}

function loadOptions() {
    // Proxy Profiles
    ignoreFieldsChanges = true;
    $("#proxyProfiles .tableRow").remove();
    ProfileManager.loadProfiles();
    var profiles = ProfileManager.getSortedProfileArray();
    var profilesTemp = ProfileManager.getProfiles();
    var currentProfile = ProfileManager.getCurrentProfile();
    var lastSelectedProfile = selectedRow;
    selectedRow = undefined;
    var i, profile, row, rule;
    for (i in profiles) {
        if (profiles.hasOwnProperty(i)) {
            profile = profiles[i];
            if (!profile.id || profile.id.length == 0 || profile.id == "unknown") {
                generateProfileId(profilesTemp, profile);
                profilesTemp[profile.id] = profile;
            }

            row = newRow(profile);

            if (lastSelectedProfile && profile.id == lastSelectedProfile[0].profile.id)
                $("td:first", row).click(); // selects updated profile
        }
    }

    if (currentProfile.unknown) {
        if (!RuleManager.isAutomaticModeEnabled(currentProfile)
            && currentProfile.proxyMode != ProfileManager.ProxyModes.direct) {
            currentProfile.name = ProfileManager.currentProfileName;
            row = newRow(currentProfile);
        }
    } else if (profiles.length == 0) {
        row = newRow(undefined);
        if (!selectedRow)
            $("td:first", row).click();
    }

    if (!selectedRow)
        $("#proxyProfiles .tableRow td:first").click();

    // Switch Rules
    RuleManager.loadRules();
    var defaultRule = RuleManager.getDefaultRule();
    $("#rulesTable .defaultRow")[0].rule = defaultRule;
    switchRulesEnabled = RuleManager.isEnabled();
    if (switchRulesEnabled)
        $("#chkSwitchRules").attr("checked", "checked");

    $("#chkSwitchRules").change();

    $("#rulesTable .tableRow").remove();
    var rules = RuleManager.getSortedRuleArray();
    var rulesTemp = RuleManager.getRules();
    selectedRuleRow = undefined;
    for (i in rules) {
        if (rules.hasOwnProperty(i)) {
            rule = rules[i];
            if (!rule.id || rule.id.length == 0) {
                generateRuleId(rulesTemp, rule);
                rulesTemp[rule.id] = rule;
            }

            row = newRuleRow(rule, false);
        }
    }

    if (RuleManager.isRuleListEnabled())
        $("#chkRuleList").attr("checked", "checked");

    $("#chkRuleList").change();
    $("#txtRuleListUrl").val(Settings.getValue("ruleListUrl", ""));
    $("#cmbRuleListReload option[value='" + Settings.getValue("ruleListReload", 720) + "']").attr("selected", "selected");
    var ruleListProfileId = Settings.getValue("ruleListProfileId", -1);
    if (Settings.getValue("ruleListAutoProxy", false))
        $("#chkAutoProxy").attr("checked", "checked");

    // Network
    if (Settings.getValue("monitorProxyChanges", true))
        $("#chkMonitorProxyChanges").attr("checked", "checked");
    if (Settings.getValue("preventProxyChanges", false))
        $("#chkPreventProxyChanges").attr("checked", "checked");

    $("#chkMonitorProxyChanges").change();
    $("#chkPreventProxyChanges").change();

    // General
    if (Settings.getValue("quickSwitch", false))
        $("#chkQuickSwitch").attr("checked", "checked");

    $("#chkQuickSwitch").change();

    $("#cycleEnabled, #cycleDisabled, #cmbDefaultRuleProfile, #cmbRuleListProfile, #cmbStartupProfile").empty();
    var directProfile = ProfileManager.directConnectionProfile;
    var autoProfile = ProfileManager.autoSwitchProfile;
    var systemProfile = ProfileManager.systemProxyProfile;
    profiles.unshift(directProfile);

    var ps = new Array();

    $.each(profiles, function (key, profile) {
        var ii = $("<option>").attr("value", profile.id).text(profile.name);
        var item = ii.clone();
        item[0].profile = profile;
        if (defaultRule.profileId == profile.id)
            item.attr("selected", "selected");

        $("#cmbDefaultRuleProfile").append(item);

        item = ii.clone();
        item[0].profile = profile;
        if (ruleListProfileId == profile.id)
            item.attr("selected", "selected");

        $("#cmbRuleListProfile").append(item);

        ps[profile.id] = profile;
    });

    ps[autoProfile.id] = autoProfile;
    ps[systemProfile.id] = systemProfile;

    var startupProfileId = Settings.getValue("startupProfileId", "");

    var item = $("<option>").attr("value", "").text(I18n.getMessage("options_lastSelectedProfile"));
    item[0].profile = { id:"" };
    $("#cmbStartupProfile").append(item);

    for (i in ps) {
        if (ps.hasOwnProperty(i)) {
            profile = ps[i];
            ii = $("<option>").attr("value", profile.id).text(profile.name);
            ii[0].profile = profile;

            if (startupProfileId == profile.id)
                ii.attr("selected", "selected");
            $("#cmbStartupProfile").append(ii);
        }
    }

    var cycleEnabled = $("#cycleEnabled");
    var cycleDisabled = $("#cycleDisabled");
    var QSP = Settings.getObject("quickSwitchProfiles") || [];

    $.each(QSP, function (key, pid) {
        var profile = ps[pid];
        if (profile == undefined) return;
        var ii = $("<li>").text(profile.name).append($("<div>").addClass(profile.color));
        ii[0].profile = profile;
        cycleEnabled.append(ii);
        ps[profile.id] = undefined;
    });
    for (i in ps) {
        if (ps.hasOwnProperty(i)) {
            profile = ps[i];
            if (profile == undefined) continue;
            var ii = $("<li>").text(profile.name).append($("<div>").addClass(profile.color));
            ii[0].profile = profile;
            cycleDisabled.append(ii);
        }
    }

    $("#quickSwitchDiv ul").sortable("refresh");


    if (Settings.getValue("confirmDeletion", true))
        $("#chkConfirmDeletion").attr("checked", "checked");
    if (Settings.getValue("refreshTab", false))
        $("#chkRefreshTab").attr("checked", "checked");

    $("#chkConfirmDeletion").change();
    $("#chkRefreshTab").change();

    $("#lastListUpdate").text(Settings.getValue("lastListUpdate", "Never"));

    // Done
    ignoreFieldsChanges = false;
    anyValueModified = false;
}

function updateListNow() {
    if (anyValueModified)
        if (InfoTip.confirmI18n("message_saveOptions"))
            saveOptions();
        else
            return;
    var result = RuleManager.loadRuleList(true);
    if (result == null)
        InfoTip.alertI18n("message_SwitchRulesDisabled");

    $("#updatingListIcon").css("visibility", "visible");

    RuleManager.loadRuleListCallback = function (success) {
        $("#updatingListIcon").css("visibility", "hidden");
        if (!success) {
            InfoTip.alertI18n("message_errorDownloadingRuleList");
        }
        else {
            ProfileManager.applyProfile(RuleManager.getAutomaticModeProfile(), function () {
                $("#lastListUpdate").text(Settings.getValue("lastListUpdate", new Date().toString()));
                InfoTip.alertI18n("message_ruleListUpdated");
            });
        }
    };
}
function apply2All() {
    var id = $("#rulesTable .defaultRow")[0].rule.profileId;
    var select = $("#rulesTable .defaultRow select")[0];
    var name = select.selectedOptions[0].innerText;
    if (!InfoTip.confirmI18n("message_apply2All", name)) return;
    var rs = $("#rulesTable .tableRow");
    $("select[name=profileId]", rs).val(id);
    rs.each(function (i, t) {
        t.rule.profileId = id;
    });
    onFieldModified(true);
}
function saveOptions() {
    // Proxy Profiles
    var currentProfile = ProfileManager.getCurrentProfile();
    var oldProfiles = ProfileManager.getProfiles();
    var profiles = {};
    var rows = $("#proxyProfiles .tableRow");
    var i, row, profile, rule;
    for (i = 0; i < rows.length; i++) {
        row = rows[i];
        profile = row.profile;
        if (profile.unknown != undefined) // don't save unknown profiles
            continue;

        profile.proxyHttp = fixProxyString(profile.proxyHttp, "80");
        profile.proxyHttps = fixProxyString(profile.proxyHttps, "443");
        profile.proxyFtp = fixProxyString(profile.proxyFtp, "21");
        profile.proxySocks = fixProxyString(profile.proxySocks, "80");

        if (profile.proxyHttp == profile.proxyHttps
            && profile.proxyHttps == profile.proxyFtp
            && profile.proxyFtp == profile.proxySocks)
            profile.useSameProxy = true;

        if (profile.proxyMode == ProfileManager.ProxyModes.auto && profile.proxyConfigUrl.length == 0)
            profile.proxyMode = ProfileManager.ProxyModes.manual;

        if (!profile.id || profile.id.length == 0 || profile.id == "unknown") {
            generateProfileId(oldProfiles, profile);
            oldProfiles[profile.id] = profile; // just for not choosing the same id again.
        }

        profiles[profile.id] = profile;

        if (profile.name == currentProfile.name) // reapply current profile (in case it's changed)
            ProfileManager.applyProfile(profile);
    }

    ProfileManager.setProfiles(profiles);
    ProfileManager.save();

    // Switch Rules
    var oldRules = RuleManager.getRules();
    var rules = {};
    rows = $("#rulesTable .tableRow");
    for (i = 0; i < rows.length; i++) {
        row = rows[i];
        rule = row.rule;

        if (!rule.id || rule.id.length == 0) {
            generateRuleId(oldRules, rule);
            oldRules[rule.id] = rule;
        }

        rules[rule.id] = rule;
    }
    var defaultRule = $("#rulesTable .defaultRow")[0].rule;

    RuleManager.setEnabled($("#chkSwitchRules").is(":checked"));
    RuleManager.setRules(rules);
    RuleManager.setDefaultRule(defaultRule);

    var ruleListEnabled = $("#chkRuleList").is(":checked");
    if (RuleManager.isEnabled() && (!RuleManager.isRuleListEnabled() && ruleListEnabled)) {
        RuleManager.setRuleListEnabled(true);
        RuleManager.loadRuleList(false);
    }
    RuleManager.setRuleListEnabled(ruleListEnabled);
    Settings.setValue("ruleListUrl", $("#txtRuleListUrl").val());
    Settings.setValue("ruleListReload", $("#cmbRuleListReload option:selected").val());
    Settings.setValue("ruleListProfileId", $("#cmbRuleListProfile option:selected")[0].profile.id);
    Settings.setValue("ruleListAutoProxy", $("#chkAutoProxy").is(":checked"));

    RuleManager.save();
    if (RuleManager.isAutomaticModeEnabled(currentProfile))
        ProfileManager.applyProfile(RuleManager.getAutomaticModeProfile());

    // Network
    Settings.setValue("monitorProxyChanges", ($("#chkMonitorProxyChanges").is(":checked")));
    Settings.setValue("preventProxyChanges", ($("#chkPreventProxyChanges").is(":checked")));

    // General
    Settings.setValue("quickSwitch", ($("#chkQuickSwitch").is(":checked")));

    var QSP = new Array();
    $("#cycleEnabled li").each(function (i, n) {
        QSP.push(n.profile.id);
    });
    Settings.setObject("quickSwitchProfiles", QSP);

    Settings.setValue("startupProfileId", $("#cmbStartupProfile option:selected")[0].profile.id);

    Settings.setValue("confirmDeletion", ($("#chkConfirmDeletion").is(":checked")));
    Settings.setValue("refreshTab", ($("#chkRefreshTab").is(":checked")));

    extension.setIconInfo();
    InfoTip.showMessageI18n("message_optionsSaved", InfoTip.types.success);
    loadOptions();
    anyValueModified = false;
}

function closeWindow() {
    if (anyValueModified && InfoTip.confirmI18n("message_saveChangedValues"))
        saveOptions();

    window.close();
}

function switchTab(tab) {
    var tabId;
    switch (tab) {
        case "rules":
            tabId = "tabRules";
            break;

        case "network":
            tabId = "tabNetwork";
            break;

        case "importexport":
            tabId = "tabImportExport";
            break;

        case "general":
            tabId = "tabGeneral";
            break;

        default:
            tabId = "tabProfiles";
            break;
    }
    $("#" + tabId).click();
}

function resetOptions() {
    if (!confirm("\nThis will delete all your options permanently, continue?"))
        return;

    if (!confirm("\nAre you sure you want to delete all your options permanently?"))
        return;

    extension.localStorage.clear();
    Settings.refreshCache();
    alert("\nOptions reset successfully..");
    loadOptions();
    anyValueModified = false;
}

function onFieldModified(isChangeInProfile) {
    if (ignoreFieldsChanges) // ignore changes when they're really not changes (populating fields)
        return;

    if (isChangeInProfile && selectedRow != undefined) {
        delete selectedRow[0].profile.unknown; // so it can be saved (when clicking Save)
        selectedRow.removeClass("unknown");
    }
    anyValueModified = true;
}

function generateProfileId(profiles, profile) {
    var profileId = profile.name;
    if (profiles[profileId] != undefined || profileId == ProfileManager.directConnectionProfile.id) {
        for (var j = 2; ; j++) {
            var newId = profileId + j;
            if (profiles[newId] == undefined) {
                profileId = newId;
                break;
            }
        }
    }
    profile.id = profileId;
}

function generateRuleId(rules, rule) {
    var ruleId = rule.name;
    if (rules[ruleId] != undefined) {
        for (var j = 2; ; j++) {
            var newId = ruleId + j;
            if (rules[newId] == undefined) {
                ruleId = newId;
                break;
            }
        }
    }
    rule.id = ruleId;
}

function newRow(profile) {
    var table = $("#proxyProfiles");
    var row = $("#proxyProfiles .templateRow").clone();
    row.removeClass("templateRow").addClass("tableRow");
    table.append(row);

    $("td:first", row).click(onSelectRow);

    if (profile) {
        profile = ProfileManager.normalizeProfile(profile);
        $("td:first", row).text(profile.name);
        $("td:nth(1) div div", row).addClass(profile.color);
//		$("td:nth(0)", row).addClass("c" + profile.color);
        row[0].profile = profile;
        if (profile.unknown)
            row.addClass("unknown");

    } else {
        var profileName = $("#proxyProfiles .templateRow td:first").text(); // template name
        row[0].profile = {
            name:profileName,
            proxyMode:ProfileManager.ProxyModes.manual,
            proxyHttp:"",
            useSameProxy:false,
            proxyHttps:"",
            proxyFtp:"",
            proxySocks:"",
            socksVersion:4,
            proxyExceptions:"localhost; 127.0.0.1; <local>",
            proxyConfigUrl:""
        };

        $("td:first", row).click();
        $("td:nth(1) div div", row).addClass("blue");
        $("#profileName").focus().select();
    }
    return row;
}

function deleteRow() {
    var row = event.target.parentNode.parentNode;
    if (!Settings.getValue("confirmDeletion", true)
        || InfoTip.confirmI18n("message_deleteSelectedProfile", row.children[0].innerText)) {

        if (selectedRow != undefined && selectedRow[0] == row)
            onSelectRow({}); // to clear fields.

        $(row).remove();

        saveOptions();
        loadOptions();
        extension.setIconInfo();
        InfoTip.showMessageI18n("message_profileDeleted", InfoTip.types.info);
    }
}

function changeColor() {
    var target = event.target.onclick ? event.target.children[0] : event.target;
    var cell = $(target);
    var profile = target.parentNode.parentNode.parentNode.profile;
    var color;

    if (cell.attr("class") == "" || cell.hasClass("blue"))
        color = "green";
    else if (cell.hasClass("green"))
        color = "red";
    else if (cell.hasClass("red"))
        color = "yellow";
    else if (cell.hasClass("yellow"))
        color = "purple";
    else if (cell.hasClass("purple"))
        color = "blue";

    cell.attr("class", color);
    profile.color = color;
}

function onSelectRow(e) {
    var profile;
    if (e.target) { // fired on event?
        var row = $(this).parent();
        if (selectedRow)
            selectedRow.removeClass("selected");

        row.addClass("selected");
        selectedRow = row;

        profile = row[0].profile;

    } else { // or by calling
        profile = e;
    }

    ignoreFieldsChanges = true;
    var proxyInfo;
    $("#profileName").val(profile.name || "");

    proxyInfo = parseProxy(profile.proxyHttp || "", 80);
    $("#httpProxyHost").val(proxyInfo.host);
    $("#httpProxyPort").val(proxyInfo.port);

    if (profile.useSameProxy) {
        $("#useSameProxy").attr("checked", "checked");
    }
    else {
        $("#useSameProxy").removeAttr("checked");
    }
    $("#useSameProxy").change();

    if (profile.proxyMode == ProfileManager.ProxyModes.manual) {
        $("#modeManual").attr("checked", "checked");
        $("#modeAuto").removeAttr("checked");
    }
    else {
        $("#modeManual").removeAttr("checked");
        $("#modeAuto").attr("checked", "checked");
    }
    $("#modeManual").change();

    proxyInfo = parseProxy(profile.proxyHttps || "", 443);
    $("#httpsProxyHost").val(proxyInfo.host);
    $("#httpsProxyPort").val(proxyInfo.port);

    proxyInfo = parseProxy(profile.proxyFtp || "", 21);
    $("#ftpProxyHost").val(proxyInfo.host);
    $("#ftpProxyPort").val(proxyInfo.port);

    proxyInfo = parseProxy(profile.proxySocks || "", 80);
    $("#socksProxyHost").val(proxyInfo.host);
    $("#socksProxyPort").val(proxyInfo.port);

    if (profile.socksVersion == 5)
        $("#socksV5").attr("checked", "checked");
    else
        $("#socksV4").attr("checked", "checked");

    $("#proxyExceptions").val(profile.proxyExceptions || "");

    $("#proxyConfigUrl").val(profile.proxyConfigUrl || "");

    $("#profileName").focus().select();

    ignoreFieldsChanges = false;
}

function enterFieldEditMode(cell) {
    var input = $("input", cell);
    var span = $("span", cell);
    if (input.is(":visible"))
        return;
    var v = span.text();
    if (v == "-")
        input.val("");
    else
        input.val(span.text());
    input.toggle();
    span.toggle();
    input.focus();
//	input.select();
}

function exitFieldEditMode(cell) {
    var input = $("input", cell);
    var span = $("span", cell);
    var newValue = input.val().replace(/(^\s*)|(\s*$)/g, "");
    if (newValue == "")
        newValue = "-"; // workaround for jQuery bug (toggling an empty span).

    if (!anyValueModified)
        anyValueModified = (span.text() != newValue);

    var rule = cell.parentNode.parentNode.rule;
    rule[input.attr("name")] = input.val();

    span.text(newValue);
    input.toggle();
    span.toggle();
}

function newRuleRow(rule, activate) {
    if (!rule && !switchRulesEnabled)
        return;

    var table = $("#rulesTable");
    var row = $("#rulesTable .templateRow").clone();
    row.removeClass("templateRow").addClass("tableRow");
    table.append(row);

    $("td", row).click(function () {
        if (switchRulesEnabled)
            enterFieldEditMode(this);
    });
    $("input", row).blur(function () {
        exitFieldEditMode(this.parentNode);
    }).keypress(function () {
            if (event.keyCode == 13) // Enter Key
                $(event.target).blur();
        });
    $("input, select", row).keydown(function () {
        if (event.keyCode == 9) { // Tab Key
            $(event.target).blur();
            var nextFieldCell;
            if (!event.shiftKey)
                nextFieldCell = event.target.parentNode.parentNode.nextElementSibling;
            else
                nextFieldCell = event.target.parentNode.parentNode.previousElementSibling;

            $(nextFieldCell).click();
            $("input, select", nextFieldCell).focus().select();
            return false;
        }
    });

    var combobox = $("select[name='profileId']", row);
    var profiles = ProfileManager.getSortedProfileArray();
    var directProfile = ProfileManager.directConnectionProfile;
    var item = $("<option>").attr("value", directProfile.id).text(directProfile.name);
    item[0].profile = directProfile;
    combobox.append(item);
    $.each(profiles, function (key, profile) {
        var item = $("<option>").attr("value", profile.id).text(profile.name);
        item[0].profile = profile;
        if (rule && rule.profileId == profile.id)
            item.attr("selected", "selected");

        combobox.append(item);
    });
    combobox.change(function () {
        var rule = this.parentNode.parentNode.parentNode.rule;
        rule.profileId = $("option:selected", this)[0].profile.id;
        anyValueModified = true;
    });

    combobox = $("select[name='patternType']", row);
    if (rule)
        $("option[value='" + rule.patternType + "']", combobox).attr("selected", "selected");

    combobox.change(function () {
        var rule = this.parentNode.parentNode.parentNode.rule;
        rule.patternType = $("option:selected", this).val();
        anyValueModified = true;
    });

    if (rule) {
        row[0].rule = rule;
        $(".ruleName", row).text(rule.name);
        $(".urlPattern", row).text(rule.urlPattern);
    } else {
        var ruleName = $("#proxyProfiles .templateRow td:first").text(); // template name
        row[0].rule = {
            name:ruleName,
            urlPattern:"",
            patternType:RuleManager.PatternTypes.wildcard,
            profileId:ProfileManager.directConnectionProfile.id
        };
    }
    if (activate) {
        $("td:first", row).click();
        $("td:first input", row).select();
    }
}

function deleteRuleRow() {
    var row = event.target.parentNode.parentNode;
    if (switchRulesEnabled
        && (!Settings.getValue("confirmDeletion", true)
        || InfoTip.confirmI18n("message_deleteSelectedRule", row.children[0].innerText))) {
        $(row).remove();
        saveOptions();
        loadOptions();
        extension.setIconInfo();
        InfoTip.showMessageI18n("message_ruleDeleted", InfoTip.types.info);
    }
}

function saveFileAs(fileName, fileData) {
    try {
        var Blob = window.Blob || window.WebKitBlob;

        // Detect availability of the Blob constructor.
        var constructor_supported = false;
        if (Blob) {
          try {
            new Blob([], { "type" : "text/plain" });
            constructor_supported = true;
          } catch (_) { }
        }

        var b = null;
        if (constructor_supported) {
          b = new Blob([fileData], { "type" : "text/plain" });
        } else {
          // Deprecated BlobBuilder API
          var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
          var bb = new BlobBuilder();
          bb.append(fileData);
          b = bb.getBlob("text/plain");
        }

        saveAs(b, fileName);
    } catch (e) {
        Logger.log("Oops! Can't save generated file, " + e.toString(), Logger.Types.error);
        InfoTip.alertI18n("message_cannotSaveFile");
    }
}

function exportPacFile() {
    var script = RuleManager.generateAutoPacScript();

    saveFileAs("SwitchyPac.pac", script);
}

function exportRuleList() {
    var ruleListData = RuleManager.generateRuleList();

    saveFileAs("SwitchyRules.ssrl", ruleListData);
}

function makeBackup() {
    var options = {};
    for (var optionName in localStorage) {
        if (localStorage.hasOwnProperty(optionName) && optionName != "ruleListRules") {
            options[optionName] = localStorage[optionName];
        }
    }

    var backupData = $.base64Encode(JSON.stringify(options));

    saveFileAs("SwitchyOptions.bak", backupData);
}

function restoreBackup() {
    var txtBackupFilePath = $("#txtBackupFilePath");
    if (txtBackupFilePath.hasClass("initial") || txtBackupFilePath.val().trim().length == 0) {
        InfoTip.alertI18n("message_selectBackupFile");
        txtBackupFilePath.focus();
        return;
    }
    var backupFilePath = txtBackupFilePath.val();
    var backupData = undefined;

    $.ajax({
        async:false,
        url:backupFilePath,
        success:function (data) {
            if (data.length <= 1024 * 50) // bigger than 50 KB
                backupData = data;
            else
                Logger.log("Too big backup file!", Logger.Types.error);
        },
        error:function () {
            Logger.log("Error downloading the backup file!", Logger.Types.warning);
        },
        dataType:"text",
        cache:false,
        timeout:10000
    });

    restoreBase64Json(backupData);
}
function restoreLocal() {
    var rfile = $("#rfile")[0];
    if (rfile.files.length > 0 && rfile.files[0].name.length > 0) {
        var r = new FileReader();
        r.onload = function (e) {
            restoreBase64Json(e.target.result);
        };
        r.onerror = function () {
            InfoTip.alertI18n("message_cannotReadOptionsBackup");
        };
        r.readAsText(rfile.files[0]);
        rfile.value = "";
    }
}
function importPAC() {
    var pfile = $("#pfile")[0];
    if (pfile.files.length > 0 && pfile.files[0].name.length > 0) {
        var r = new FileReader();
        r.onload = function (e) {
            $("#proxyConfigUrl").val(selectedRow[0].profile.proxyConfigUrl = e.target.result);
            onFieldModified(true);
        };
        r.onerror = function () {
            InfoTip.alertI18n("message_cannotReadOptionsBackup");
        };
        r.readAsDataURL(pfile.files[0]);
        pfile.value = "";
    }
}
function restoreBase64Json(j) {
    var o;
    try {
        j = $.base64Decode(j);
        o = JSON.parse(j);
    }
    catch (e) {
        Logger.log("Oops! Can't restore from this backup file. The backup file is corrupted or invalid, " + e.toString(), Logger.Types.error);
        InfoTip.alertI18n("message_cannotRestoreOptionsBackup");
        return;
    }
    restoreObject(o);
}
function restoreObject(o) {
    if (!InfoTip.confirmI18n("message_restoreOptionsBackup")) {
        return;
    }
    for (var optionName in o) {
        if (o.hasOwnProperty(optionName)) {
            localStorage[optionName] = o[optionName];
        }
    }
    InfoTip.alertI18n("message_successRestoreOptionsBackup");
    Settings.refreshCache();
    window.location.reload();
}

function getQueryParams() {
    var query = document.location.search || "";
    if (query.indexOf("?") == 0)
        query = query.substring(1);

    query = query.split("&");

    var params = [];
    for (var i in query) {
        if (query.hasOwnProperty(i)) {
            var pair = query[i].split("=");
            params[pair[0]] = pair[1];
        }
    }

    return params;
}

function checkPageParams() {
    var params = getQueryParams();
    if (params["firstTime"] == "true")
        InfoTip.showMessageI18n("message_firstTimeWelcome", InfoTip.types.note, -1);

    if (params["rulesFirstTime"] == "true")
        InfoTip.showMessageI18n("message_rulesFirstTimeWelcome", InfoTip.types.note, -1);

    switchTab(params["tab"]);
}

function parseProxy(proxy, port) {
    if (proxy == undefined || proxy.length == 0) {
        return {
            host:"",
            port:""
        };
    }

    proxy = fixProxyString(proxy, port);
    var pos = proxy.lastIndexOf(":");
    var host = (pos > 0 ? proxy.substring(0, pos) : proxy);
    port = (pos > 0 ? proxy.substring(pos + 1) : "");
    return {
        host:host,
        port:port
    };
}

function joinProxy(proxy, port, defaultPort) {
    if (proxy.indexOf(":") >= 0 && (proxy[0] != '[' || proxy[proxy.length - 1] != ']'))
        return proxy;

    if (port != undefined && port.trim().length == 0)
        port = defaultPort || "80";

    return proxy + ":" + port;
}

function fixProxyString(proxy, defaultPort) {
    if (proxy == undefined || proxy.length == 0)
        return "";

    if (proxy.indexOf(":") > 0)
        return proxy;

    if (proxy.indexOf(":") == 0)
        return "";

    defaultPort = defaultPort || "80";
    return proxy + ":" + defaultPort;
}
$(document).ready(function(){
    init();
    $("body").on("click", "div.color", changeColor);
    $("body").on("click", "div.delete.row", deleteRow);
    $("#btn-new").click(function() { newRow(); });
    $("#rfile").change(restoreLocal);
    $("#RestoreFileButton").click(function(){
        $("#rfile").click();
    });
    $("#pfile").change(importPAC);
    $("#importPACButton").click(function(){
        $("#pfile").click();
    });
    $("body").on("click", "div.delete.rule", deleteRuleRow);
    $("#apply2All").click(apply2All);
    $("#btnNewRule").click(function(){
        newRuleRow(undefined, true);
    });
    $("#updateListNow").click(updateListNow);
    $("#exportPacFile").click(exportPacFile);
    $("#exportRuleList").click(exportRuleList);
    $("#makeBackup").click(makeBackup);
    $("#restoreBackup").click(restoreBackup);
    $("#resetOptions").click(resetOptions);
    $("#saveOptions").click(saveOptions);
    $("#closeWindow").click(closeWindow);
});

