
//if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);

//  Template.hello.helpers({
  //  counter: function () {
    //  return Session.get('counter');
  //  }
//  });

  //Template.hello.events({
    //'click button': function () {
      // increment the counter when button is clicked
      //Session.set('counter', Session.get('counter') + 1);
    //}
  //});
//}


//if (Meteor.isServer) {
  //Meteor.startup(function () {
    // code to run on server at startup
  //});
//}

// simple-todos.js
Tents = new Mongo.Collection("tents");

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("tents");

  Template.body.helpers({
    tents: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tents
        return Tents.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tents
        return Tents.find({}, {sort: {createdAt: -1}});
      }
    },

    hideCompleted: function () {
      return Session.get("hideCompleted");
    },

    incompleteCount: function () {
      return Tents.find({checked: {$ne: true}}).count();
    }
  });

  Template.tent.helpers({
    isOwner: function () {
      return this.owner === Meteor.userId();
    }
  });

  Template.body.events({
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    },

    "submit .new-tent": function (event) {
      //This function is called when the new tent form is submitted

      event.preventDefault();

      //var text = event.target.text.value;
      console.log("New tent event:", event);
      console.log("Full string:", event.target.title.value);
      console.log("Full string:", event.target.colour.value);
      console.log("Full string:", event.target.capacity.value);

      var title = event.target.title.value || "";
      var colour = event.target.colour.value || "";
      var capacity = event.target.capacity.value || "";

      Meteor.call("addTent", {
        title: title,
        colour: colour,
        capacity: capacity,
      });


      // Clear form
      event.target.title.value = "";
      event.target.colour.value = "";
      event.target.capacity.value = "";

      // Prevent default form submit
      return false;
    }
  });


  Template.tent.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTent", this._id);
    },
    "click .toggle-private": function () {
      Meteor.call("setPrivate", this._id, ! this.private);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addTent: function (data) {
    // Make sure the user is logged in before inserting a tent
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    console.log('addTent title', data.title);
    console.log('addTent colour', data.colour);
    console.log('addTent capacity', data.capacity);
    Tents.insert({
      title: data.title,
      colour: data.colour,
      capacity: data.capacity,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  deleteTent: function (tentId) {
    // Make sure the user is logged in before deleting a tent
    var tent = Tents.findOne(tentId);
    if (tent.private && tent.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tents.remove(tentId);
  },

  setChecked: function (tentId, setChecked) {
    Tents.update(tentId, { $set: { checked: setChecked}});
  },

  setPrivate: function (tentId, setToPrivate) {
    var tent = Tents.findOne(tentId);

    console.log('tent.owner', tent.owner);
    console.log('Meteor.userId()', Meteor.userId());

    // Make sure only the tent owner can make a tent private
    if (tent.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tents.update(tentId, { $set: { private: setToPrivate}});
  }
});

if (Meteor.isServer) {
  Meteor.publish("tents", function(){
    return Tents.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}
