var MyMixin = {

    show : function(p){
        $(".container-fluid #mapView").hide();
        console.log("show amp "+p);
        $(".container-fluid #mapView").animate({width: 'show'}, _.bind(function() {
            google.maps.event.trigger(this.gmap, "resize");
        },this));


    }



}