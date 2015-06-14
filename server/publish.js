Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('items', function() {
  //check(listId, String);

  return Items.find();
});

/*
Meteor.publish('tents', function(listId) {
  check(listId, String);

  return Tents.find({listId: listId});
});
*/
