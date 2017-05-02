$(document).ready(function () {
  let toggle = 0;
  $('#toggle_header').click(function () {
    toggle += 1;
    if (toggle % 2 === 0) {
      $('header').addClass('red');
      $('header').removeClass('green');
    } else {
      $('header').addClass('green');
      $('header').removeClass('red');
    }
  });
});
