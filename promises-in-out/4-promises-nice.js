post = Z.bindAsync(post)
get = Z.bindAsync(get)
concatUrl = Z.bindSync(concatUrl)
assertEquals = Z.bindSync(assertEquals)

getAfter = function(url, waitForThese) {
  return Z(waitForThese).then(function() {
    return get(url);
  });
};




blog = post('/blogs', {
  name: 'My blog'
})

entry1 = post(concatUrl('blogs', blog.get('id'), 'entries'), {
  title: 'my first post'
  body: 'Here is the text of my first post'
})

entry2 = post(concatUrl('blogs', blog.get('id'), 'entries'), {
  title: 'my second post'
  body: 'I do not know what to write any more...'
})

visitor1 = post('/user', {
  name: 'john doe'
})

visitor2 = post('/user', {
  name: 'jane doe'
})

comment1 = post('/comments', {
  userId: visitor1.get('id')
  entryId: entry1.get('id')
  text: "well written dude"
})

comment2 = post('/comments', {
  userId: visitor2.get('id')
  entryId: entry1.get('id')
  text: "like it!"
})

comment3 = post('/comments', {
  userId: visitor2.get('id')
  entryId: entry2.get('id')
  text: "nah, crap"
})

allComments = [comment1, comment2, comment2]

blogInfoUrl = concatUrl('blogs', blog.get('id'))

blogInfo = getAfter(blogInfoUrl, allComments)

assertEquals(blogInfo, {
  name: 'My blog'
  numberOfEntries: 2
  numberOfComments: 3
})
