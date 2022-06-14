(function ($) {

    $.fn.ncbiclearbutton = function () {
        var validInputs = ['INPUT'];
        return this.each(function () {
            if (navigator.userAgent.match(/Trident.*rv[ :]*11\./) || navigator.appVersion.indexOf("MSIE 10") > -1) {
                return;
            }

            if (validInputs.indexOf(this.tagName) === -1) {
                throw ('Clear button can only be added to ' + validInputs.join(', '));
            }

            var $wrapper = $('<div class="ncbi-clear-button-wrapper"></div>');
            var $xButton = $('<button class="ncbi-clear-button-x" type="button"><span class="fa fa-times"></span><span class="usa-sr-only">Clear</span></button>');
            var $textbox = $(this);

            // if the textbox is used with .usa-search, then there is no need to create an additional wrapper
            // because that will cause a lot of css conflicts
            if ($textbox.closest('.usa-search').length) {
                $wrapper = $textbox.closest('.usa-search');
                initializeClearButton($xButton, $textbox, $wrapper);
                $xButton.insertAfter($textbox);
            } else {
                // set the width & height of the wrapper to the textbox
                $wrapper.css({
                    'width': $textbox.width() + 'px',
                    'height': $textbox.height() + 'px'
                });

                // initialize $xButton
                initializeClearButton($xButton, $textbox, $wrapper);

                // wrap textbox inside a wrapper and also add a clear button
                $textbox.wrap($wrapper);
                $xButton.insertAfter($textbox);
            }

        });

        function initializeClearButton($xButton, $textbox) {
            // add ARIA-attributes
            var textboxId = $textbox.attr('id');
            if (typeof textboxId === 'undefined' || textboxId === '') {
                throw ('Cannot initialize ncbiclearbutton. Textbox has no id');
            }
            $xButton.attr('aria-controls', textboxId);

            // add a click event handler
            $xButton.click(function (e) {
                $textbox.focus().val('');
                toggleClearButtonVisibility($(this), $textbox);
                e.preventDefault();
                e.stopPropagation();
            });

            $textbox.on('keydown keyup change', function () {
                // toggle the visibility of the button based on the content of the textbox
                toggleClearButtonVisibility($xButton, $textbox);
            });

            toggleClearButtonVisibility($xButton, $textbox);
        }

        function toggleClearButtonVisibility($xButton, $textbox) {
            if ($textbox.val() !== '') {
                $xButton.attr('aria-hidden', false);
                $xButton.show();

                // fix the textbox padding-right
                var w = parseInt($xButton.css('width')) || 40;
                $textbox.css('padding-right', w + 'px');
            } else {
                $xButton.attr('aria-hidden', true);
                $xButton.hide();
            }
        }

    };

    /* --------------------------------------------------------------------------------------------------------- */
    /* initialize all elements with the data-clear-button="true" */
    $(document).ready(function ($) {
        $('[data-clear-button=true]').ncbiclearbutton();
    });

})(jQuery);

