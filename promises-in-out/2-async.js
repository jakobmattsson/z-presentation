// Start by reading the background in the README if you haven't yet.

// Solution #2

// Now we're doing some parts in parallel.
// Both blog entries are created at the same time.
// So are the users and later the comments.
// But each step still blocks the next one.

post('/blogs', {
  name: 'My blog'
}, function(err, blog) {

  var entryData = [{
    title: 'my first post',
    body: 'Here is the text of my first post'
  }, {
    title: 'my second post',
    body: 'I do not know what to write any more...'
  }]

  async.forEach(entryData, function(entry, callback), {
    post(concatUrl('blogs', blog.id, 'entries'), entry, callback);
  }, function(err, entries) {

    var usernames = ['john doe', 'jane doe'];

    async.forEach(usernames, function(user, callback) {
      post('/user', { name: user }, callback);
    }, function(err, visitors) {

      var commentsData = [{
        userId: visitor[0].id,
        entryId: entries[0].id,
        text: "well written dude"
      }, {
        userId: visitor[1].id,
        entryId: entries[0].id,
        text: "like it!"
      }, {
        userId: visitor[1].id,
        entryId: entries[1].id,
        text: "nah, crap"
      }];

      async.forEach(commentsData, function(comment, callback) {
        post('/comments', comment, callback);
      }, function(err, comments) {

        get(concatUrl('blogs', blog.id), function(err, blogInfo) {

          assertEquals(blogInfo, {
            name: 'My blog',
            numberOfEntries: 2,
            numberOfComments: 3
          });
        });
      });
    });
  });
});
