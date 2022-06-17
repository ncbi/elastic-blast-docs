var ncbi = ncbi || {};
ncbi.nwds = ncbi.nwds || {};
ncbi.nwds.localNav = {
    init: function () {
        var _this = this;
        this.initLocalNav();
    },

    initLocalNav: function () {
        var topList = $('.ncbi-topnav-list');
        if (topList) {
            var menuButton = $('<button id="topnav-btn" class="navicon" aria-controls="nav-menu"></button>');
            menuButton.append($('<span class="fa fa-navicon"></span>'));
            menuButton.append(' Sections');
            topList.after(menuButton);

            var menuHead = $('<div class="ncbi-popup-head"></div>');
            menuHead.append($('<h4>Sections</h4>'));
            menuHead.append($('<button class="ncbi-close-button"><span class="fa fa-close" aria-hidden="true"><span class="usa-sr-only">Close</span></span></button>'));

            var comboList = topList.clone();
            comboList.attr('id', 'sidenav-list');
            comboList.attr('class', 'usa-sidenav-list');

            comboList.find('a[class="usa-current"]').each(function () {
                var subList = $('#sidenav-list').clone();
                subList.attr('id', null);
                subList.attr('class', 'usa-sidenav-sub_list');
                $(this).parent().append(subList);
            });

            var menuBox = $('<div class="ncbi-popup nav-popup" id="nav-menu"></div>');
            menuBox.hide();
            menuBox.attr('aria-hidden', 'true');
            menuBox.append(menuHead);
            menuBox.append(comboList);

            var menuAnchor = $('<div class="ncbi-popup-anchor"></div>');
            menuAnchor.append(menuBox);
            topList.parent().prepend(menuAnchor);
        }
        $('#topnav-btn').ncbipopup();
    }
};

(function ($) {
    $(function () {
        ncbi.nwds.localNav.init();
    });
})(jQuery);
