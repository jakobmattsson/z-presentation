// Slide 1
// =======

var post = function(url, data, callback) {
  // POSTs `data` to `url` and
  // then invokes `callback`
};

post = Z.bindAsync(post);

var comment1 = post('/comments', {
  userId: visitor1.get('id'),
  entryId: entry1.get('id'),
  text: 'well written dude'
});





// Slide 2
// =======

var add = function(x, y) {
  return x + y; 
};

add = Z.bindSync(add);

var sum = add(v1.get('id'), e1.get('id'));

var comment1 = post('/comments', {
  userId: visitor1.get('id'),
  entryId: entry1.get('id'),
  text: 'well written dude',
  likes: sum
});
