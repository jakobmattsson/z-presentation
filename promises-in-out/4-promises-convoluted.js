// Start by reading the background in the README if you haven't yet.

// Solution #4

// Now we're using promises and the solution is a whole lot cleaner.
// The functions "post", "concatUrl", "get" and "all" return promises,
// much like they would have done if for example Q was used to convert
// the functions from our previous examples to promise-based functions.

// Blog entries and users are created at the same time and comments
// do not depend on *all* entries and users any more. Instead they are
// created as soon as the particular blog entry and user needed for the
// comment are in place.

// Thanks to the new logic, this solution will be faster than all before it.
// The careful reader will note that it's still a bit suboptimal. The users
// could have been created at the same time as the blog itself, since the blog
// is not needed to create the users. This mistake is innocent, doesn't matter
// too much and maybe no one would even notice it. Which is the point. What if
// the system could have optimized this itself?!

// This solution represents what I feel like most promise-based code look like.
// And it's not good enough!!

post('/blogs', {
  name: 'My blog'
}).then(function(blog) {

  var visitor1 = post('/user', {
    name: 'john doe'
  });

  var visitor2 = post('/user', {
    name: 'jane doe'
  });

  var entry1 = post(concatUrl('blogs', blog.id, 'entries'), {
    title: 'my first post',
    body: 'Here is the text of my first post'
  });

  var entry2 = post(concatUrl('blogs', blog.id, 'entries'), {
    title: 'my second post',
    body: 'I do not know what to write any more...'
  });

  var comment1 = all(entry1, visitor1).then(function(e1, v1) {
    post('/comments', {
      userId: v1.id,
      entryId: e1.id,
      text: "well written dude"
    });
  });

  var comment2 = all(entry1, visitor2).then(function(e1, v2) {
    post('/comments', {
      userId: v2.id,
      entryId: e1.id,
      text: "like it!"
    });
  });

  var comment3 = all(entry2, visitor2).then(function(e2, v2) {
    post('/comments', {
      userId: v2.id,
      entryId: e2.id,
      text: "nah, crap"
    });
  });

  all(comment1, comment2, comment3).then(function() {
    get(concatUrl('blogs', blog.id)).then(function(blogInfo) {
      assertEquals(blogInfo, {
        name: 'My blog',
        numberOfEntries: 2,
        numberOfComments: 3
      });
    });
  });
});
