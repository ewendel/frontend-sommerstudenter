function slideShow() {
  var current = $('.imageGallery .show');
  var next = current.next().is('img') ? current.next() : current.parent().find('img:first');
  current.hide().removeClass('show');
  next.fadeIn('slow').addClass('show');

  setTimeout(slideShow, 5000);
}

slideShow();