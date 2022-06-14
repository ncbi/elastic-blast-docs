(function ($) {

  $.fn.ncbifeedback = function () {
    return this.each(function () {
      var $this = $(this);
      addQueryStringAttributes();

      function addQueryStringAttributes() {
        // get Survey code from user entered html attribute named 'data-surveycode'
        var suvery_code = $this.attr('data-surveycode') ? $this.attr('data-surveycode') : '';
        // Survey code is necessary to build url for feedback button, if that is empty,
        // then just return '#' instead of building rest of Query string for url.
        if (suvery_code.length == 0) {
          $this.attr('href', '#');
          return;
        }
        var p_elem = jQuery('meta[name=ncbi_pdid]');
        var a_elem = jQuery('meta[name=ncbi_app]');
        var p_val = p_elem.length > 0 ? (p_elem.attr('content') ? p_elem.attr('content') : '') : '';
        var a_val = a_elem.length > 0 ? (a_elem.attr('content') ? a_elem.attr('content') : '') : '';
        var s_val = ncbi.nwds.utils.getCookie('ncbi_sid');
        var from_val = encodeURIComponent(window.location.href);
        var feedback_url = 'https://www.research.net/r/' + suvery_code + '?a=' + a_val + '&from=' + from_val + '&p=' + p_val + '&s=' + s_val;
        $this.attr('href', feedback_url);
      }
    });
  }

  $.fn.ncbifeedback.init = function () {
    $('.ncbi-feedback-button').ncbifeedback();
  }

  $(document).ready(function ($) {
    $.fn.ncbifeedback.init();
  });

})(jQuery);

