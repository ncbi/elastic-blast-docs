(function ($) {
    $(function () {
        window.addEventListener('click', function (event) {
            var $srcElement = $(event.target);

            // if the 'click' event is originated from the menu, then ignore the click
            if ($srcElement.hasClass('usa-nav-link') || $srcElement.parent().hasClass('usa-nav-link')) {
                return; // this is the menu
            }

            var $navLinks = $('.usa-nav-link[aria-expanded=true]');
            $navLinks.each(function (i, elem) {
                var $elem = $(elem);
                var controlSelector = $elem.attr('aria-controls');

                // if not a valid selector then prefix it with a #
                controlSelector = _isValidCssSelector(controlSelector) ? controlSelector : '#' + controlSelector;

                var $control = $(controlSelector);
                if ($control.length && $control.attr('aria-hidden') === 'false') {
                    $elem.click();
                }
            });

            function _isValidCssSelector(selector) {
                // valid selector means start with # or . (id or class)
                return selector.match(/[\#|\.].*/) !== null;
            }
        });
    });
})(jQuery);
