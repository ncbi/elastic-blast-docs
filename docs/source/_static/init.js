function bannerAdInit()
{
    jQuery("#banner_ad #closeAd").bind("click", function (e) {
        var ariaContrl = jQuery(this).attr("aria-controls");
        jQuery("#" + ariaContrl).remove();
    });
    jQuery("#banner_ad #jt").bind("click", function (e) {
        jQuery("#btnJt").click();
    });
    jQuery("#btnJt").bind("click", function(e) {
        winRef = window.open(jQuery("#jt")[0].href, "hlp" )
        jQuery("#closeAd").click();
    });
}

jQuery( document ).ready(function() {
    bannerAdInit();
});