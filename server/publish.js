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

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
        {fields: {'currentItem': 1}});
  } else {
    this.ready();
  }
});

//Meteor.publish('users' fun)
/*
Meteor.publish('tents', function(listId) {
  check(listId, String);

  return Tents.find({listId: listId});
});
*/
