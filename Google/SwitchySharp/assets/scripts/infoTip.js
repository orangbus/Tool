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
var InfoTip = {};

///// Message Types //////
InfoTip.types = {
    note:"note",
    info:"info",
    success:"success",
    warning:"warning",
    error:"error"
};

InfoTip._timer = undefined;

InfoTip.showMessage = function showMessage(message, type, timeout) {
    if (timeout == undefined)
        timeout = 2500;

    if (InfoTip._timer) {
        clearTimeout(InfoTip._timer);
        InfoTip._timer = undefined;
    }
    $("#infoTipContainer").remove();

    var note = $("<div id='infoTipContainer'><div>" +
        "<span class='close'></span>" +
        "<span class='text'>Info Tip</span>" +
        "</div></div>");

    note.attr("class", type);
    $(".text", note).html(message);
    $(document.body).append(note);

    if (type == InfoTip.types.note) {
        $(".close", note).show().click(function () {
            note.animate({ top:-note.height() - 10 }, "fast");
        });
    }

    note.animate({ top:-1 }, "fast");

    if (timeout > 0) {
        InfoTip._timer = setTimeout(function () {
            note.animate({ top:-note.height() - 10 }, "normal");
            InfoTip._timer = undefined;
        }, timeout);
    }
};

InfoTip.showMessageI18n = function showMessageI18n(messageId, type, timeout) {
    var message = I18n.getMessage(messageId);
    return InfoTip.showMessage(message, type, timeout);
};

InfoTip.confirm = function confirm(message) {
    return window.confirm("\n" + message);
};

InfoTip.confirmI18n = function confirmI18n(messageId, substitution) {
    var message = I18n.getMessage(messageId, substitution);
    return InfoTip.confirm(message);
};

InfoTip.alert = function alert(message) {
    return window.alert("\n" + message);
};

InfoTip.alertI18n = function alertI18n(messageId, substitution) {
    var message = I18n.getMessage(messageId, substitution);
    return InfoTip.alert(message);
};
