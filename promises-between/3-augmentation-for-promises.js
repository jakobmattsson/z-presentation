// Slide 1
// =======

var commentData = get('/comments/42');

var text = commentData.get('text');

var lowerCased = text.then(function(text) {
  return text.toLowerCase();
});





// Slide 2
// =======

Z.mixin({
  toLowerCase: function() {
    return this.value.toLowerCase();
  }
});

var commentData = get('/comments/42');

commentData.get('text').toLowerCase();





// Slide 3
// =======

Z.mixin(zUnderscore);
Z.mixin(zBuiltins);

var comment = get('/comments/42');

comment.get('text').toLowerCase().first(5);
