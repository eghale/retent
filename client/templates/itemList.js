/**
 * Created by Ellie on 09/06/2015.
 */
Template.itemList.helpers ({

    tents: function () {
        return Tents.find({}, {sort: {createdAt: -1}});
    },

    tentsReady: function() {
        return true;
        //return Router.current().tentsHandle.ready();
    }
});