var topics = [
    "pusekatt",
    "bekk",
    "Erik Wendel"
];

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandom = function() {
    var random = getRandomInt(0, topics.length);
    return topics[random];
};

exports.getRandom = getRandom;