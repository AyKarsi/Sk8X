var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "map"               : "map",
        "addspot/:lat/:lng"  : "addspot",
        "editspot/:_id"     : "editspot",
        "mapoptions"        : "mapOptions",
        "mapoptions/:action": "action",
        "users/page/:page"	: "list",
        "users/add"         : "addWine",
        "users/:id"         : "wineDetails",
        "about"             : "about"
    },

    mapView :null,

    initialize: function () {

        forge.logging.log("init from router..");

        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);

        var point = new MapMarker({
            lat: 48.123447013691425,
            lng: 11.572508388082952
        });

        this.mapModel = new MapModel({
            center: point,
            zoomLevel:17
        });
        //debugger;
        //this.mapView = new MapView({model: this.mapModel });
        //this.navigatePage("#map");
    },
    navigatePage: function(id){
        $(".row-fluid").hide();
        if ($("#"+id).length > 0) {
            $("#"+id).show();
            return false;
        }
        //$("#content").append(el);
        return true;

    },
    action:function(action){
        switch(action){
            case "addspot":
                this.addSpot();
                break;
            default:
                alert("action not implemented :" + action);
        }
        return;

    },
    home: function () {
        if (!this.navigatePage('homeView'))
            return;
        if (!this.homeView) {
            this.homeView= new HomeView();
        }
    },

    addspot: function(lat,lng)
    {
        var model = new Spot({
            pos:[lat,lng]
        });
        model.set('_id', model.cid);
        $("#spotEditView").remove();
        new SpotEditView({model: model});
        this.navigatePage('spotEditView');
    },
    editspot :function(_id){

        var model = new Spot({_id: _id});
        model.fetch({
            success:_.bind(function() {
                $("#spotEditView").remove();
                new SpotEditView({model: model});
                this.navigatePage('spotEditView');
            },this),
            error :function() {
                alert("error");
            }
        });


    },
	list: function(page) {


        if (!this.navigatePage('userListView'))
            return;
        //var view = new UserListView();

        var p = page ? parseInt(page, 10) : 1;
        var userList = new UserCollection();
        userList.fetch({success: function(){
            new UserListView({model: userList, page: p});
        }},this);
        this.headerView.selectMenuItem('home-menu');
    },



    mapOptions: function() {
        if (!this.navigatePage('mapOptionsView'))
            return;
        this.optionsList = new MapOptionCollection();
        this.optionsList.fetch({success:_.bind(function(){
            $("#content-fluid").append(new MapOptionsView({model:this.optionsList}).el);

        },this)});



    },

    map: function() {
        if (!this.navigatePage('mapView')){
            google.maps.event.trigger(this.mapView.gmap, "resize");
            return;
        }

        this.mapView = new MapView({model: this.mapModel });
        //$("#container-fluid").append(this.mapView.el);

        this.userList = new UserCollection();
        this.userList.fetch({success:_.bind(function(){
            var userPoints = this.userList.getPoints();
            this.mapModel.markers.add(userPoints);
        },this)});

        this.spotList = new SpotCollection();
        this.spotList.fetch({success:_.bind(function(){
            var spotPoints = this.spotList.getPoints();
            this.mapModel.markers.add(spotPoints);
        },this)});

        this.headerView.selectMenuItem('home-menu');

        google.maps.event.trigger(this.mapView.gmap, "resize");
    },




    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content-fluid').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});
