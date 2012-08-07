define([
    'jquery',
    'underscore',
    'backbone'
], function ($,_,Backbone) {

    window.SpotController = function(){

        this.init = function () {
            this.loading = true;
            this.spotCollection = new SpotCollection ();
            this.spotCollection.fetch({success:_.bind(function(){
                console.log("spots loaded");
                this.loading = false;
            },this)},this);
        };
        this.init();


        this.featureList = ['Rail', 'Curb','Pipe'];

        this.addSpot = function(lat,lng, callback){
            var model = new Spot({
                pos:[lat,lng]
            });
            //model.set('_id', model.cid);
            var spotView = new SpotEditView({model: model});
            callback(spotView);
        };
        this.editSpot = function(id,callback){


            var model = this.spotCollection.get(id);
            if (model == null){
                alert("spot not found");
                return;
            }


            var view = new SpotEditView({model:model});
            if (callback != null)
                callback(view);
            return;
/*

            var model = new Spot({_id: id});

            model.fetch({
                success:_.bind(function() {

                    var view = new SpotEditView({model: model});
                    if (callback != null)
                        callback(view);

                },this),
                error :function() {
                    alert("error");
                }
            });
*/
        };

        this.spotOptions = function(id, callback){
            var optionsList = new OptionCollection();

            optionsList.add(new Option({
                href:"#checkin/"+id,
                text:"Checkin",
                icon:'icon-map-marker'
            }));

            optionsList.add(new Option({
                href:"#comment/"+id,
                text:"Comment & Rate Spot",
                icon:'icon-map-marker'
            }));

            optionsList.add(new Option({
                href:"#editspot/"+id,
                text:"Edit Spot Details",
                icon:'icon-map-marker'
            }));

            optionsList.add(new Option({
                href:"#viewtricks/"+id,
                text:"View Tricks",
                icon:'icon-map-marker'
            }));

            optionsList.add(new Option({
                href:"#addtrick/"+id,
                text:"Add Tricks",
                icon:'icon-map-marker'
            }));

            optionsList.add(new Option({
                href:"#viewskaters/"+id,
                text:"View Skaters (Current)",
                icon:'icon-map-marker'
            }));
            optionsList.add(new Option({
                href:"#viewskatersTop/"+id,
                text:"View Skaters (Top)",
                icon:'icon-map-marker'
            }));
            var menuView = new MenuView({model:optionsList});
            callback(menuView);


        }

        /*



        this.listUsers = function (){
            var view = new ListUsersView({model: this.userCollection});
            $('#content').html(view.el);
            return view;
        };
        this.editUser = function(username){
            var user = this.userCollection.get(username);
            if (user == null)
                return null;
            var view = new EditUserView({model:user});
            $('#content').html(view.el);
            return view;
        }*/
    }
});

