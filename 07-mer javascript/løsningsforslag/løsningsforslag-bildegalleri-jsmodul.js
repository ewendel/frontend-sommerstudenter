var SlideShow = (function() {
  var imageTemplate = function(img) {
    return '<img src="' + img + '" style="display:none" />';
  };

  var SlideShow = function(options) {
    if(options.el) {
      this.setElement(options.el);
    }
    this.initialize.apply(this, arguments);
  };

  $.extend(SlideShow.prototype, {

    initialize: function(options) {
      options.data.done(this.dataLoadedHandler.bind(this));
    },

    setElement: function(el) {
      this.$el = $(el);
    },

    render: function() {
      var html = $.map(this.images, imageTemplate);

      this.$el
        .html(html)
        .find("img:first").addClass("show");
    },

    nextSlide: function(callback) {
      var current = this.$el.find('.show');
      var next = current.next().is('img') ? current.next() : current.parent().find('img:first');
      current.hide().removeClass('show');
      current.fadeOut('slow', function() {
        next.fadeIn('slow').addClass('show');
        callback && callback.call(this);
      });
    },

    startSlideShow: function() {
      var nextSlide = this.nextSlide.bind(this);

      nextSlide(function() {
        this.timeId = setTimeout(nextSlide, 5000);
      });
    },

    stopSlideShow: function() {
      clearTimeout(this.timeId);
    },

    dataLoadedHandler: function(data) {
      this.images = data.images;
      this.render();
      this.startSlideShow();
    }
  });

  return SlideShow;
})();


var url = "http://sommer2014.herokuapp.com/";
var imgDeffere = $.ajax({
  dataType: "jsonp",
  url: url
});

var slideShow = new SlideShow({
  el: ".image-gallery",
  data: imgDeffere
});


