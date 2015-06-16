
AutoForm.hooks({
    insertItemForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            console.log('AutoForm submit', insertDoc, updateDoc, currentDoc);
            this.done();
            return false;
        },
        onSuccess: function(insert, result) {
            console.log(insert,result);
            //Then I want to put the id from the 'insert, result'
            // part through the itemPhoto (put it in the brackets next to it)
            Router.go('itemPhoto');
        }
    }
});
