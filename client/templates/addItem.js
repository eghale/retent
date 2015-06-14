
AutoForm.hooks({
    insertTentForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            console.log('AutoForm submit', insertDoc, updateDoc, currentDoc);
            this.done();
            return false;
        }
    }
});
