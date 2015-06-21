Template.addItem.helpers({
    getRouteContext: function(){
        return result;
    }
});

AutoForm.hooks({
    insertItemForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            console.log('AutoForm submit', insertDoc, updateDoc, currentDoc);
            this.done();
            return false;
        },
        onSuccess: function(verb, result) {
            console.log(verb, result);
            var user = Meteor.user();
            Meteor.users.update({_id: user._id}, {$set: {currentItem: result}});
            //Items.findOne({_id: "aZfWGWkzHnimHKZMu"})
            Router.go('itemPhoto');
        },
        onError: function(insert, error) {
            console.log(insert, error);
        }
    }
});
