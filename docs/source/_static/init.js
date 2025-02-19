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
    jQuery("#vote_helpful_yes,#vote_helpful_no").bind("click", function (e) {
        if(jQuery(":target").length) {
            //file:///U:/blast64/django/elastic-blast-sphynx/WB-5728-add-missing-static-files/elastic-blast-docs/docs/build/html/janitor.html#auto-shutdown-feature
            var currSubSection = jQuery(":target").attr("id");        //#auto-shutdown-feature                 
        }
        var currSection = jQuery("div.body section").first().attr("id");
        
        var ref;
        if(currSection && currSection.length > 0){
            ref = "section=" + currSection;
        }
        if(currSubSection && currSubSection.length) {
            if(ref != "") ref += "&";
            ref += "subsection=" + currSubSection;                 
        }   
        if(ref) {
            jQuery(this).attr("ref",ref);                 
        }
        jQuery(this).closest(".ncbi-vote-helpful").text('Thanks for your feedback')        
        return false;   
    });          
});