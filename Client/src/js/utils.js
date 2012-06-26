var utils = {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function(views, callback) {
        try {
        var deferreds = [];

        $.each(views, function(index, view) {

            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                    forge.logging.log("loaded view: "+ view);
                }));
            } else {
                alert(view + " not found");
            }
        });
        forge.logging.log("calling applly ");

        $.when.apply(null, deferreds).done(callback);
            forge.logging.log("applly called");
        }
        catch (e){
            forge.logging.log("error creating views: " + e);
        }
    },

    uploadFile: function (file, callbackSuccess) {
        var self = this;
        var data = new FormData();
        data.append('file', file);
        $.ajax({
            url: 'api/upload.php',
            type: 'POST',
            data: data,
            processData: false,
            cache: false,
            contentType: false
        })
        .done(function () {
            console.log(file.name + " uploaded successfully");
            callbackSuccess();
        })
        .fail(function () {
            self.showAlert('Error!', 'An error occurred while uploading ' + file.name, 'alert-error');
        });
    },

    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },

    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },

    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },

    showAlert: function(title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();
    },

    hideAlert: function() {
        $('.alert').hide();
    },

    getMarkerOpt:function(type){

        switch(type){
            case "User":

                var image = new google.maps.MarkerImage(
                    'img/marker-images/skater.png',
                    new google.maps.Size(20,25),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10,25)
                );

                var shadow = new google.maps.MarkerImage(
                    'img/marker-images/skater-shadow.png',
                    new google.maps.Size(36,25),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10,25)
                );

                var shape = {
                    coord: [12,1,12,2,13,3,12,4,18,5,18,6,18,7,11,8,10,9,10,10,9,11,10,12,11,13,12,14,12,15,12,16,11,17,11,18,10,19,10,20,14,21,14,22,13,23,13,24,6,24,6,23,1,22,1,21,1,20,2,19,2,18,3,17,3,16,4,15,5,14,5,13,5,12,5,11,5,10,6,9,7,8,2,7,2,6,2,5,9,4,9,3,9,2,10,1,12,1],
                    type: 'poly'
                };

                //var skateMarker = new google.maps.Marker(
                var skateMarker = {
                    draggable: true,
                    raiseOnDrag: true,
                    icon: image,
                    shadow: shadow,
                    shape: shape

                };
                return skateMarker;
            break;
            default:
                var skateMarker = {
                    draggable: true,
                    raiseOnDrag: true
                };

                break;
        }

    }

};