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
var HelpToolTip = {};
HelpToolTip.lastTipElement = undefined;

HelpToolTip.onMouseOver = function onMouseOver(event) {
    if (HelpToolTip.lastTipElement != undefined)
        HelpToolTip.hide();

    var element = document.getElementById("help_" + event.toElement.getAttribute("data-help"));
    element.style.top = 0;
    element.style.left = 0;

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    if (event.pageX - width - 50 + document.body.scrollLeft >= 0) {
        element.style.left = (event.pageX - width - 5) + 'px';
    } else {
        element.style.left = (event.pageX + 15) + 'px';
    }

    if (event.pageY - height - 50 + document.body.scrollTop >= 0) {
        element.style.top = (event.pageY - height - 5) + 'px';
    } else {
        element.style.top = (event.pageY + 15) + 'px';
    }

//	setTimeout(function() {
//		element.style.visibility = 'visible';
//	}, 500);
//	element.style.visibility = 'visible';

    setTimeout(HelpToolTip.show, 600);
    HelpToolTip.lastTipElement = element;
};

HelpToolTip.onMouseOut = function onMouseOut() {
    HelpToolTip.hide();
};

HelpToolTip.show = function show() {
    if (HelpToolTip.lastTipElement)
        HelpToolTip.lastTipElement.style.visibility = 'visible';
};

HelpToolTip.hide = function hide() {
    if (HelpToolTip.lastTipElement) {
        //HelpToolTip.lastTipElement.parentNode.removeChild(HelpToolTip.lastTipElement);
        HelpToolTip.lastTipElement.style.visibility = 'hidden';
        HelpToolTip.lastTipElement = undefined;
    }
};

HelpToolTip.enableTooltips = function enableTooltips() {
    $("span[data-help]").click(HelpToolTip.show).mouseout(HelpToolTip.onMouseOut).mouseover(HelpToolTip.onMouseOver);
    //var helpElements = document.getElementsByClassName('help');

    //for (var i = 0, helpElement; helpElement = helpElements[i]; i++) {
    //	helpElement.onmouseover = HelpToolTip.onMouseOver;
    //	helpElement.onmouseout = HelpToolTip.onMouseOut;
    //	helpElement.onclick = HelpToolTip.show;
    //}
};