$(function() {
  let $input = $('input[type=text]');
  let $accordion = $('#accordion');
  let $anchor = $('a');
  $('form').on('submit', e => {
    e.preventDefault();
    let character = $input.val();
    $(document).off('keypress').on('keypress', e => {
      if (e.key !== character) {
        return;
      }
      $anchor.trigger('click');
    });
    $anchor.on('click', e => {
      e.preventDefault();
      $accordion.slideToggle();
    })
  });
});