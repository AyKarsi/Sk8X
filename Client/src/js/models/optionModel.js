var Option = Backbone.Model.extend({

    defaults: {
        href:'#',
        text:'',
        icdon:''


    }

});

var OptionCollection= Backbone.Collection.extend({

    model: Option


});