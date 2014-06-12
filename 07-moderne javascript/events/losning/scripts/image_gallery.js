/* MY IMAGE */

var MyImage = function(item) {
	this.srcSmall = item.media.m.replace("_m", "_s");
	this.srcLarge = item.media.m.replace("_m", "");
	this.title = item.title;
	this.largeImage = $('<img title="' + this.title + '" alt="' + this.title + '" class="image-large" src="' + this.srcLarge + '" />');
	this.smallImage = $('<img title="' + this.title + '" alt="' + this.title + '" class="image-small" src="' + this.srcSmall + '" />')
};

MyImage.prototype.init = function() {
	this.preload(); 
}

MyImage.prototype.preload = function() {
	var img = new Image();
	img.src = this.srcLarge;
};

/* IMAGE GALLERY */

var images = [];

var generateFlickrUrl = function(query) {
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&tags=" + query + "&tagmode=all&format=json&jsoncallback=?"
	return url;
};

var createImageObjects = function(items) {
	// Vi itererer over respons, og lager et nytt bilde-objekt per item 
	images = []; // husk på å tømme lista for hver gang
	$(items).each(function() {
		var item = this;
		var img = new MyImage(item); 
		img.init(); 
		images.push(img); // Vi legger til hvert bilde-objekt på slutten av arrayet 
	});
};

var renderThumbs = function(numberOfImages) {
	var container = $('<div class="images-nav" />');

	for(i = 0; i < numberOfImages; i++) {
		var image = images[i];
		container.append(image.smallImage);
	};

	return container; 
};

var getImagesFor = function (query, $renderTo) {

	var numberOfImages = 8;
	var url = generateFlickrUrl(query);
	var $loadingMessage = $("<p class='loading'>Please wait while we load some images tagged with <strong>" + query + "</strong> from Flickr</p>");

	$renderTo.html($loadingMessage);

	$.ajax({
		dataType: "jsonp", 
		url: url,
		success: function(response) {
			createImageObjects(response.items); 
			var html = renderThumbs(numberOfImages); 
			$renderTo.html(html);
		},
		error: function() {
			$renderTo.html("Sorry, an error occured.");
		}
	});
};

/* APPLICATION SETUP */

var startImageGallery = function(el) {

	// Tar i mot et dom-element med jQuery-funksjoner, f.eks.
	// $('<div id="bildegalleri" />');	

	var $inputField = el.find("#tagSearch");
	var $thumbsContainer = el.find("#thumbs");
	var $largeImageContainer = el.find("#largeImage");

	var timeoutId;

	$inputField.on("keyup", function(event){
		var keyCode = event.keyCode;

		// Hva sjekker du her?
		if(keyCode >= 48 && keyCode <= 90 ||
			keyCode == 222 ||
			keyCode == 186 ||
			keyCode == 219
		){
			var tag = $(this).val();
			tag = $.trim(tag); // Fjerner mellomrom foran og bak

			clearTimeout(timeoutId);
			timeoutId = setTimeout(function(){
				// Venter 1 sekund, slik at søket ikke fyres 
				// av hver gang man trykker på en tast
				getImagesFor(tag, $thumbsContainer);
				$largeImageContainer.hide();
			}, 1000);
		}
	});

	$thumbsContainer.on("click", "img", function() {
		var $image = $(this);
		var index = $image.index();

		var image = images[index];
		var imageTitleHtml = '<div class="title">' + image.title + "</div>";

		$largeImageContainer.html([image.largeImage, imageTitleHtml]).show();
	});
	

};