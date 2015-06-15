
AutoForm.hooks({
    insertItemForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            console.log('AutoForm submit', insertDoc, updateDoc, currentDoc);
            this.done();
            return false;
        },
        onSuccess: function(insert, result) {
            Router.go('itemList');
        }
    }
});
