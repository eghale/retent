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

Tents = new Mongo.Collection('tents');

Tents.attachSchema(new SimpleSchema({
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

Tents.allow({
  'insert': function (userId, tent) {
    console.log('insert userId, tent', userId, tent);
    // user and doc checks ,
    // return true to allow insert
    return true;
  }
});

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("tents")};
