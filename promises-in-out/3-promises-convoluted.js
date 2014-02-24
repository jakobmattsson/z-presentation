post('/blogs', {
  name: 'My blog'
}).then(function(blog) {

  entry1 = post(concatUrl('blogs', blog.id, 'entries'), {
    title: 'my first post'
    body: 'Here is the text of my first post'
  })

  entry2 = post(concatUrl('blogs', blog.id, 'entries'), {
    title: 'my second post'
    body: 'I do not know what to write any more...'
  })

  visitor1 = post('/user', {
    name: 'john doe'
  })

  visitor2 = post('/user', {
    name: 'jane doe'
  })

  comment1 = all(entry1, visitor1).then(function(e1, v1) {
    post('/comments', {
      userId: v1.id
      entryId: e1.id
      text: "well written dude"
    })
  })

  comment2 = all(entry1, visitor2).then(function(e1, v2) {
    post('/comments', {
      userId: v2.id
      entryId: e1.id
      text: "like it!"
    })
  })

  comment3 = all(entry2, visitor2).then(function(e2, v2) {
    post('/comments', {
      userId: v2.id
      entryId: e2.id
      text: "nah, crap"
    })
  })

  all(comment1, comment2, comment3).then(function() {
    get(concatUrl('blogs', blog.id)).then(function(blogInfo) {
      assertEquals(blogInfo, {
        name: 'My blog'
        numberOfEntries: 2
        numberOfComments: 3
      })
    })
  })
})
