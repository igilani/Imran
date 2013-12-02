/**
 * Description:   Detect Device
 * Usage examples:
 *    str1  = Detect(); // -> 'tablet'
 *    str2  = Detect({ useUA: true }); // -> 'tablet'
 *    array = Detect({ verbose: true }); // -> ['tablet', 'media queries']
 *    TBD    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
 */

var Detect = function(options) {
    if (options === undefined) options = {};

    this.init = function() {
        this.mm = window.matchMedia;

        if (this.mm && !options.useUA) {
            this.method = 'media queries';
            this.type   = mq();
        }
        else {
            this.method = 'user agent strings';
            this.type   = ua();
        }

        return options.verbose ? [ this.type, this.method ] : this.type;
    };


    /**
     * Media queries
     */

    var mq = function() {
        if (minMatch(320) && maxMatch(480))
            return 'smartphone';

        if (minMatch(768) && maxMatch(1024))
            return 'tablet';

        return 'desktop';
    };

    var match = function(m, width) {
        return window.matchMedia(
            'screen and (' + m + '-device-width: '
                + width + 'px)').matches;
    };

    var minMatch = function(width) {
        return match('min', width);
    };

    var maxMatch = function(width) {
        return match('max', width);
    };


    /**
     * User agent strings
     */

    var ua = function() {
        var uas = navigator.userAgent;
        var ual = navigator.userAgent.toLowerCase();
        var ipad = (ual.match(/ipad/i));
        var ffox = (ual.match(/firefox/i));
        var mobiledev = (ual.match(/ipod|mini|windows\sce|palm/i));

        if (ipad) return 'ipad';

        if (ffox) return 'firefox';

        if (mobiledev) return 'mobiledevice';

        tablets = [ /Android 3/i, /iPad/i ];

        for (i=0, l=tablets.length; i<l; i++)
            if (uas.match(tablets[i])) return 'tablet';

        smartphones = [
            /Mobile/i,
            /iPhone/i,
            /BlackBerry/i,
            /Windows Phone/i,
            /Windows Mobile/i,
            /Maemo/i,
            /PalmSource/i,
            /SymbianOS/i,
            /SymbOS/i,
            /Nokia/i,
            /MOT-/i,
            /JDME/i,
            /Series 60/i,
            /S60/i,
            /SonyEricsson/i,
        ];
        for (i=0, l=smartphones.length-1; i<l; i++)
            if (uas.match(smartphones[i])) {
                return 'smartphone';
            }

        return 'desktop';
    };

    return this.init();
};

$b(document).ready(function () {
Hammer("#splendid2013_container").on("tap",  function(){
    alert('you tapped');
    return;
})
});