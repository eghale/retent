Lists = new Mongo.Collection('lists');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'Item ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'Item ' + nextLetter;
  }

  return nextName;
};

Items = new Mongo.Collection('items');


Items.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "What have you got?",
    allowedValues: ["Tent","Chair","Gazebo","Sunshade","Stool","Other"]
  },
  colour: {
    type: String,
    label: "Colour",
    max: 200
  },
  capacity: {
    type: Number,
    label: "Capacity",
    min: 0
  },
  damage: {
    type: String,
    label: "Is there any dirt or damage?",
    max: 500
  }
}));

Items.allow({
  'insert': function (userId, item) {
    console.log('insert userId, item', userId, item);
    // user and doc checks ,
    // return true to allow insert
    return true;
  }
});


if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("items")};
