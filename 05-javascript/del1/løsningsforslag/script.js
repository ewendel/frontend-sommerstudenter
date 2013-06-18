function slideShow() {
  var current = $('#slideshow .show');
  var next = current.next().length ? current.next() : current.parent().find('li:first');
  current.hide().removeClass('show');
  next.fadeIn().addClass('show');

  setTimeout(slideShow, 5000);
}