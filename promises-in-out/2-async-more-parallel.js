post('/blogs', {
  name: 'My blog'
}, function(err, blog) {

  async.parallel([
    function(callback) {
      entryData = [{
        title: 'my first post'
        body: 'Here is the text of my first post'
      }, {
        title: 'my second post'
        body: 'I do not know what to write any more...'
      }]
      async.forEach(entryData, function(entry, callback), {
        post(concatUrl('blogs', blog.id, 'entries'), entry, callback);
      }, callback);
    },
    function(callback) {
      usernames = ['john doe', 'jane doe']
      async.forEach(usernames, function(user, callback) {
        post('/user', { name: user }, callback);
      }, callback);
    }
  ], function(err, results) {
    entries = results[0]
    visitors = results[1]

    commentsData = [{
      userId: visitors[0].id
      entryId: entries[0].id
      text: "well written dude"
    }, {
      userId: visitors[1].id
      entryId: entries[0].id
      text: "like it!"
    }, {
      userId: visitors[1].id
      entryId: entries[1].id
      text: "nah, crap"
    }]

    async.forEach(commentsData, function(comment, callback) {
      post('/comments', comment, callback);
    }, function(err, comments) {

      get(concatUrl('blogs', blog.id), function(err, blogInfo) {

        assertEquals(blogInfo, {
          name: 'My blog'
          numberOfEntries: 2
          numberOfComments: 3
        })

      })
    })

  })
})