(function ($) {
    /*
    A jquery plug-in in that turns
    <button aria-controls="popupmenu">show menu</button>
    <div id="popupmenu" aria-hidden="true" aria-labelledby="IDREF">...</div> into a pop-up menu
    for example:
        $('#topnav-btn').ncbipopup();
        $('#account_info').ncbipopup({showOverlay: false});
    */

    $.fn.ncbipopup = function (options) {

        var settings = $.extend({}, $.fn.ncbipopup.defaults, options);
        return this.each(function () {

            var $popupTrigger = $(this);
            var overlay = null;

            // add aria attributes
            $popupTrigger.attr('aria-haspopup', 'true');

            // find the pop-up menu
            var $ariaControl = $('#' + $popupTrigger.attr('aria-controls'));
            if (!$ariaControl.length) {
                throw ('ncbipopup: No elements matched #' + $popupTrigger.attr('aria-controls'))
            }

            // set up overlay
            if (settings.showOverlay) {
                overlay = new ncbi.nwds.Overlay();
                $(document).on('overlay-dismissed', function (event) {
                    hidePopup($ariaControl);
                });

            }

            // initialize the pop-up (show/hide) based on the html
            init($ariaControl);

            // click event for the menu
            $popupTrigger.on('click', function (e) {
                if (getAttributeValue($ariaControl, 'aria-hidden') === 'true') {
                    showPopup($ariaControl);
                    if (settings.showOverlay === true) {
                        overlay.show();
                    }
                } else {
                    hidePopup($ariaControl);
                    if (settings.showOverlay === true) {
                        overlay.hide();
                    }
                }
            });

            $ariaControl.on('click', '.ncbi-close-button', function (e) {
                if (settings.showOverlay === true) {
                    // there is no need to call hidePopup(), because the "overlay-dismissed" will take care of that
                    overlay.hide();
                } else {
                    hidePopup($ariaControl);
                }
                $popupTrigger.focus();
            });

            // catch tab-key and shift + tab so that the focus will never leave the pop-up
            focusTrap($ariaControl, {
                onKeyESC: function (event) {
                    $ariaControl.find('.ncbi-close-button').trigger('click');
                    //if the user opens this pop-up menu by clicking the button, then send the focus back to the button
                    $popupTrigger.focus();
                    event.stopPropagation();
                }
            });

            function init($ariaControl) {
                // the dialog/pop-up need to be focusable
                $ariaControl.attr('tabindex', -1);

                // if showOverlay: true, then it's a modal dialog/pop-up
                if (settings.showOverlay) {
                    $ariaControl.attr('aria-modal', 'true')
                }

                if (getAttributeValue($ariaControl, 'aria-hidden') === 'true') {
                    hidePopup($ariaControl);
                } else {
                    showPopup($ariaControl);
                }
            }

            function hidePopup($ariaControl) {
                $ariaControl
                    .hide()
                    .attr('aria-hidden', 'true');

                $popupTrigger.attr('aria-expanded', 'false');

                // call the callback
                settings.onHidden.call();
            }

            function showPopup($ariaControl) {
                $ariaControl
                    .show()
                    .attr('aria-hidden', 'false');

                $popupTrigger.attr('aria-expanded', 'true');

                // when pop-up shows, the focus should be on the x button
                // https://www.marcozehe.de/2015/02/05/advanced-aria-tip-2-accessible-modal-dialogs/
                $ariaControl.find('.ncbi-close-button').focus();

                // call the callback
                settings.onShown.call();
            }

        });

        function getAttributeValue($elem, attrName) {
            return typeof $elem.attr(attrName) === 'undefined' ? '' : $elem.attr(attrName);
        }
    };


    $.fn.ncbipopup.defaults = {
        showOverlay: true,
        onHidden: function () {
        },
        onShown: function () {
        },
    };

    /*
    // this should be moved to its own module
    focusTrap($container, {
        onKeyTab: function(e) {},
        onKeyESC: function(e){}
    });
     */
    var focusTrap = function ($container, options) {

        var settings = $.extend({}, {
            onKeyTab: function (e) {
            },
            onKeyESC: function (e) {
            }
        }, options);

        // jQuery formatted selector to search for focusable items
        var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

        var KEY = {TAB: 9, SHIFT: 16, ESC: 27};

        // keydown seems more reliable than 'keyup'
        // for example, a user can keep holding down the tab key
        $container.on('keydown', function (event) {

            // implemented based on https://www.marcozehe.de/2015/02/05/advanced-aria-tip-2-accessible-modal-dialogs/
            if (event.keyCode === KEY.TAB) {

                // get list of all children elements in given object
                var children = $container.find('*');

                // get list of focusable items
                var focusableItems = children.filter(focusableElementsString).filter(':visible');

                // get currently focused item
                var focusedItem = $(document.activeElement);

                // get the number of focusable items
                var numberOfFocusableItems = focusableItems.length;

                var focusedItemIndex = focusableItems.index(focusedItem);

                if (!event.shiftKey && (focusedItemIndex == numberOfFocusableItems - 1)) {
                    focusableItems.get(0).focus();
                    event.preventDefault();
                }
                if (event.shiftKey && focusedItemIndex == 0) {
                    focusableItems.get(numberOfFocusableItems - 1).focus();
                    event.preventDefault();
                }
                settings.onKeyTab.call(this, event);
            }
        });

        
        $(document).on('keydown', function (event) {
            if (event.keyCode == KEY.ESC) {
                settings.onKeyESC.call(this, event);
            }
        });

    };

})(jQuery);


