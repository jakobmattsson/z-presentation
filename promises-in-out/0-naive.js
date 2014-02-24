post('/blogs', {
  name: 'My blog'
}, function(err, blog) {

  post(concatUrl('blogs', blog.id, 'entries'), {
    title: 'my first post'
    body: 'Here is the text of my first post'
  }, function(err, entry1) {

    post(concatUrl('blogs', blog.id, 'entries'), {
      title: 'my second post'
      body: 'I do not know what to write any more...'
    }, function(err, entry2) {

      post('/user', {
        name: 'john doe'
      }, function(err, visitor1) {

        post('/user', {
          name: 'jane doe'
        }, function(err, visitor2) {

          post('/comments', {
            userId: visitor1.id
            entryId: entry1.id
            text: "well written dude"
          }, function(err, comment1) {

            post('/comments', {
              userId: visitor2.id
              entryId: entry1.id
              text: "like it!"
            }, function(err, comment2) {

              post('/comments', {
                userId: visitor2.id
                entryId: entry2.id
                text: "nah, crap"
              }, function(err, comment3) {

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
        })
      })
    })
  })
})
