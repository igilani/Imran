function displaySocial (elem, x, y){
    $(elem).css('top', x + 'px');
    $(elem).css('left', y + 'px');
    $(elem).show();
}

function topNavItem (elementID, topNavElementID){
    this.elementID = elementID;
    this.topNavElementID = topNavElementID;
}

function mapDomCmItem (domElementID, cmLabel){
    this.domElementID = domElementID;
    this.cmLabel = cmLabel;
}

function mapDomToCoremetricksLookup(elementID){
    var retValue;
    $.each(mapDomCmArray, function(key, value){
        if (value.domElementID == elementID || '#' + value.domElementID == elementID) {
            retValue = value.cmLabel;
        }
    });
    return retValue;
}

function initFloatingOverlay (callingElement, floatingOverlay, showClass) {
    /*	$(callingElement).mouseover(function(){
     var currentHref = this.href;
     $(floatingOverlay).addClass(showClass);
     $(floatingOverlay).click(function(){
     window.location = currentHref;
     });
     $(floatingOverlay).show();

     });

     $(callingElement).mouseout(function(event){
     var targetID = (event.toElement || event.relatedTarget?event.relatedTarget:false).id;
     if (targetID!='floatingOverlay'){
     $(floatingOverlay).hide();
     $(floatingOverlay).removeClass(showClass);
     }

     });
     */

    $(callingElement).mouseover(function(evt){
        if (evt.relatedTarget.id == 'floatingOverlay')
            return false;

        $(floatingOverlay).addClass(showClass);
        $(floatingOverlay).show();
        evt.stopImmediatePropagation();
        return false;
    });

    $(callingElement).mouseout(function(evt){
        if (evt.relatedTarget.id == 'floatingOverlay')
            return false;

        $(floatingOverlay).hide();
        $(floatingOverlay).removeClass(showClass);
        evt.stopImmediatePropagation();
        return false;
    });
}

function initFlash(width, height, containerElementID, moviePath){
    var flMovie = moviePath;
    var flParams = {wmode:"opaque", allowScriptAccess: "always", quality: "high", allowfullscreen: "false"};
    var flAttr = {"class": "swfblock"};
    var flWidth = width;
    var flHeight = height;
    var flMinVersion = "10";
    var flContainerID = containerElementID;
    swfobject.embedSWF(flMovie, flContainerID, flWidth, flHeight, flMinVersion, "/media/expressInstall.swf", null, flParams, flAttr);
}

function initOverlay (callingElementID) {
    var overlayID = callingElementID.replace('#','') + 'Overlay';
    var classesToAdd = overlayID;

    var divString = '<div id="';
    divString += overlayID;
    divString += '" class="';
    divString += classesToAdd;
    divString += '"></div>';

    $(callingElementID).append(divString);
}
