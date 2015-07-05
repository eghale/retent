/**
 * Created by Ellie on 21/06/2015.
 */
Template.itemQr.qrCode = function(){
    return qrScanner.message();
};

qrScanner.on('scan', function(err, message) {
    console.log('qr message', message);
    console.log('qr err', err);
    if (message) {
        alert('Success! QR code scanned!', message);
        Items.update({_id: Meteor.user().currentItem}, {$set: {qr: message}});
        Router.go('itemList');
    }
});
//qrScanner.onScan: function(err, message)
// alert(message);
   // if message?

