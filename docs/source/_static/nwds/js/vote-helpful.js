(function ($) {
    $(function () {
        var CSS_CLASS = '.ncbi-vote-helpful';
        $(CSS_CLASS).each(function (index, element) {
            var $elem = $(this);
            var category = $elem.attr('data-ga-category');
            var style = $elem.attr('data-link-style');
            $elem.html('Was this helpful?&#8195;'
                + makeVoteLink('Yes', category, style, index)
                + makeVoteLink('No', category, style, index));
            $elem.addClass('vote-button-offset');

            $elem.on('click', '.usa-button', thanksForVoting);
        });

        function makeVoteLink(label, category, style, index) {
            var linkId = 'vote_helpful_' + label.toLowerCase();
            var hypertext = label;
            console.log(linkId);
            if (index > 0) {
                linkId = linkId + '_' + index;
            }
            if (style === 'icon') {
                if (label === 'Yes') {
                    hypertext = '<span class="fa fa-thumbs-up" aria-hidden="true"/><span class="usa-sr-only">Yes</span>'
                }
                else {
                    hypertext = '<span class="fa fa-thumbs-down" aria-hidden="true"/><span class="usa-sr-only">No</span>'
                }
            }

            return '<button type="button" id="' + linkId + '" aria-label="' + label + '" '
                + 'class="usa-button usa-button-outline vote-button-offset" '
                + 'data-section="' + category + '" '
                + 'data-ga-action="click_vote" data-ga-label="' + label + '">' + hypertext + '</button> '
        }

        function thanksForVoting(event) {
            var $target = $(event.currentTarget);
            console.log('thanksForVoting: ',$target.attr('data-ga-label'));
            $target.closest(CSS_CLASS)
                .text('Thanks for your feedback')
                .addClass('thank-you');
            return false;
        }
    });
})(jQuery);



