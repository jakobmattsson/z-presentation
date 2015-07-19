var data = {
  userId: visitor1.get('id'),
  entryId: entry1.get('id'),
  text: 'well written dude'
};

Z(data).then(function(result) {

  // result is now: {
  //   userId: 123,
  //   entryId: 456,
  //   text: 'well written dude'
  // }

});