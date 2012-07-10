var NavigationMixin = {
    elId:null,
    show : function(callback){
        return;
        if (this.elId == null)
            console.log("this.elId is not defined..");
        $(".container-fluid #"+this.elId).hide();
        console.log("show amp "+this.elId);
        $(".container-fluid #"+this.elId).animate({width: 'show'}, _.bind(function() {
            if (this.callback!=null)
                callback();
        },this));
    }
}

