// String trunc() method for truncation with ellipsis

String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 3) + '...' : this;
    };

var ncbi = ncbi || {};
ncbi.nwds = ncbi.nwds || {};
/* following are utility functions which can be used by any JavaScript files in this app */
ncbi.nwds.utils = ncbi.nwds.utils || {};
/* Utility helper function to get cookie value by passing name of cookie */
ncbi.nwds.utils.getCookie = function(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? decodeURI(value[1]) : null;
}
/*
 Turn a dom element (div...) to be an overlay object that stay on top of body element
 */
ncbi.nwds.Overlay = function () {
    var _this = this;
    this.$body = $('body');
    this.show = function () {
        this.$element = $('<div id="ncbi-overlay"></div>');
        this.$element.css({
            'background': '#000000',
            'opacity': .1,
            'visibility': 'inherit !important',
            'cursor': 'pointer',
            'position': 'fixed',
            'top': 0,
            'right': 0,
            'bottom': 0,
            'left': 0,
            '-webkit-transition': 'all 0.2s ease-in-out',
            'transition': 'all 0.2s ease-in-out',
            'z-index': 8000
        });

        this.$body.prepend(this.$element);
        this.$element.show();

        this.$element.click(function () {
            _this.hide();
        });
    };

    this.hide = function () {
        if (typeof this.$element !== 'undefined') {
            $.event.trigger('overlay-dismissed');
            this.$element.remove();
        }
    };

    $(document).keyup(function (e) {
        var ESC_KEY = 27;
        if (e.keyCode == ESC_KEY) {
            _this.hide();
        }
    });

};
