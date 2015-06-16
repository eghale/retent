/**
 * Created by Ellie on 16/06/2015.
 */
Template.itemPhoto.events({
    'click .takePhoto': function(event, template) {
        var cameraOptions = {
            width: 500,
            height: 300,
            quality: 70
        };
        MeteorCamera.getPicture(cameraOptions, function(error, data){
            if (!error) {
                template.$('.photo').attr('src', data);
            }
        });
        event.preventDefault();
    }
})

