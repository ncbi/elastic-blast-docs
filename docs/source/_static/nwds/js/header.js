(function () {
    $(function () {
        // URLs for My NCBI and Global Alerts should ideally be unqualified so that they go to the correct
        // region (www, test, dev) because the behavior or content differs.  However, for apps that are not
        // below www (e.g. submit.ncbi), it will need to be fully qualified to www.ncbi.nlm.nih.gov. To do
        // this, create a global JavaScript variable named ncbiBaseUrl:
        //
        //     var ncbiBaseUrl = "https://www.ncbi.nlm.nih.gov";
        //
        if (typeof ncbiBaseUrl !== 'undefined') {
            var ncbiHeadLinks = document.getElementsByClassName('set-base-url');
            for (var i = 0; i < ncbiHeadLinks.length; i++) {
                ncbiHeadLinks[i].href = ncbiBaseUrl + ncbiHeadLinks[i].getAttribute("href");
            }
        }
    });
})(jQuery);

(function () {
    $(function () {
        // By default the login button points to production login URL
        // To use dev login URL, apps need to set Global variable `useDevLoginURL` to true
        if (typeof useDevLoginURL !== 'undefined' && useDevLoginURL === true) {
            let loginLink = document.getElementById('account_login');
            loginLink.href = 'https://account-dev.ncbi.nlm.nih.gov';
        }
    });
})(jQuery);

(function () {
    $(function () {
        // add a back_url to a#myncbi's href
        var acctLinks = document.querySelectorAll('#account_login, #account_logout');
        for (var i = 0; i < acctLinks.length; i++) {
            acctLinks[i].href = acctLinks[i].getAttribute("href") + '?back_url=' + document.location.href;
        }

        var cubby = getCookie('WebCubbyUser');
        cubby = decodeURIComponent(decodeURIComponent(cubby));

        var username = getUser(cubby);

        if (username) {
            $('#uname_short').text(username.trunc(20));
            $('#uname_long').text(username.trunc(40));
            $('#account_login').hide();
            $('#account_info').show();
        }
        else {
            $('#account_login').show();
            $('#account_info').hide();
        }


        function getUser(c) {

            var re_logd = /.*logged-in\=(\w*);.*/;
            var re_user = /.*my-name\=([\w|\-|\.|\ |\@|\+]*);.*/;
            if (c) {
                var l = re_logd.exec(c);
                if (l && l[1] && l[1] === 'true') {
                    var u = re_user.exec(c);
                    if (u && u[1]) {
                        return u[1];
                    }
                }
            }
            return '';
        }


        function getCookie(f) {
            var e;
            if (window.sessionStorage) {
                try {
                    e = sessionStorage.getItem(f) || '';
                } catch (g) {
                    e = '';
                }
                if (e.length > 0) {
                    return e;
                }
            }
            if (document.cookie.length > 0) {
                e = document.cookie.indexOf(f + '=');
                if (e !== -1) {
                    e = e + f.length + 1;
                    f = document.cookie.indexOf(';', e);
                    if (f === -1) {
                        f = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(e, f))
                }
            }
            return '';
        }

        var $popupMenu = $('#account_info').ncbipopup();

    });

})(jQuery);


(function () {
    $(function () {

        if (typeof alertsUrl === 'undefined') {
            console.log('Note: alertsUrl is undefined, hence the NCBI Global Alert system will not work for this page');
            ncbi.sg.ping({'jsevent': 'warning', 'warning': 'alertsUrl is undefined'});
        }
        else {
            jQuery.getScript(alertsUrl, function () {
                galert(['.custom-alerts-placeholder', '.ncbi-alerts-placeholder', 'header.ncbi-header', 'body > *:nth-child(1)'])
            });
        }

    });
})(jQuery);
