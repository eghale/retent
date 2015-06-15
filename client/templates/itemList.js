/**
 * Created by Ellie on 09/06/2015.
 */
Template.itemList.helpers ({

    items: function () {
        return Items.find({}, {sort: {createdAt: -1}});
    },

    itemsReady: function() {
        //return true;
        return Router.current().itemsHandle.ready();
    }
});