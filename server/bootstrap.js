// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "My tent list",
       items: ["Shabby blue tent with broken zip",
         "Red chair no damage",
         "White gazebo",
         "Yellow sun shade covered in mud"
       ]
      },
      {name: "Full tent list",
       items: ["Shabby blue tent with broken zip",
         "Red chair no damage",
         "White gazebo",
         "Yellow sun shade covered in mud",
         "Huge 8 person pink tent missing ground mat",
         "Blue stool, muddy",
         "Green  chair",
         "Another green chair"
         ]
      }
    ]
  }


    var timestamp = (new Date()).getTime();
    _.each(data, function(list) {
      var list_id = Lists.insert({name: list.name,
        incompleteCount: list.items.length});

      _.each(list.items, function(text) {
        Items.insert({listId: list_id,
                      text: text,
                      createdAt: new Date(timestamp)});
        timestamp += 1; // ensure unique timestamp.
      });
    });
  }
)
