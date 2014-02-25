// Start by reading the background in the README if you haven't yet.

// Solution #5

// Now we're talking! The 
// The functions "post", "concatUrl", "getAfter" and "assertEquals"
// not only returns promises now, but also accepts them as arguments.

// The consequence of this is that no manual resolution of the promises
// is needed. We just recieve them and pass them around. No callback,
// no "then". There's not even a single function defined in this file now.

// It looks like it's written in another language, where everything is
// synchronous. But it's not. It's executing in parallel. And not just that.
// It executes *optimally*, because we ourselves have not defined the order
// in which the actions are to take place. Each promise will be resolved
// exactly when all it's dependencies are available and not a second later.

// This code is vastly more readable than all other examples and it executes
// faster without any manual effort. This is how promises should be used!

var blog = post('/blogs', {
  name: 'My blog'
});

var entry1 = post(concatUrl('blogs', blog.get('id'), 'entries'), {
  title: 'my first post',
  body: 'Here is the text of my first post'
});

var entry2 = post(concatUrl('blogs', blog.get('id'), 'entries'), {
  title: 'my second post',
  body: 'I do not know what to write any more...'
});

var visitor1 = post('/user', {
  name: 'john doe'
});

var visitor2 = post('/user', {
  name: 'jane doe'
});

var comment1 = post('/comments', {
  userId: visitor1.get('id'),
  entryId: entry1.get('id'),
  text: "well written dude"
});

var comment2 = post('/comments', {
  userId: visitor2.get('id'),
  entryId: entry1.get('id'),
  text: "like it!"
});

var comment3 = post('/comments', {
  userId: visitor2.get('id'),
  entryId: entry2.get('id'),
  text: "nah, crap"
});

var allComments = [comment1, comment2, comment2];

var blogInfoUrl = concatUrl('blogs', blog.get('id'));

var blogInfo = getAfter(blogInfoUrl, allComments);

assertEquals(blogInfo, {
  name: 'My blog',
  numberOfEntries: 2,
  numberOfComments: 3
});
