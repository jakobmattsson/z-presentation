// Start by reading the background in the README if you haven't yet.

// Solution #3

// Now we're doing even more in parallel. Blog entries and users are created
// at the same time, since they don't depend on each other. When all of those
// are done, the comments are added.

// It's significantly harder to follow this solution than the previous two,
// but at least it's faster. Congrats if you have to maintain code like this.

// It's *still* not as fast as it could be, because all the blogs and
// users have to be created before any comments are added, even though each
// comment only depend on one user and one blog entry.

post('/blogs', {
  name: 'My blog'
}, function(err, blog) {

  async.parallel([
    function(callback) {
      var entryData = [{
        title: 'my first post',
        body: 'Here is the text of my first post'
      }, {
        title: 'my second post',
        body: 'I do not know what to write any more...'
      }];
      async.forEach(entryData, function(entry, callback), {
        post(concatUrl('blogs', blog.id, 'entries'), entry, callback);
      }, callback);
    },
    function(callback) {
      var usernames = ['john doe', 'jane doe'];
      async.forEach(usernames, function(user, callback) {
        post('/user', { name: user }, callback);
      }, callback);
    }
  ], function(err, results) {

    var entries = results[0];
    var visitors = results[1];

    var commentsData = [{
      userId: visitors[0].id,
      entryId: entries[0].id,
      text: "well written dude"
    }, {
      userId: visitors[1].id,
      entryId: entries[0].id,
      text: "like it!"
    }, {
      userId: visitors[1].id,
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
