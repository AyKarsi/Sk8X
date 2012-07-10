
window.userStore = {

    users: {},


    populate: function () {

        this.users[1]= {
            _id: "AyKarsi",
            pos:[48.123447013691425,11.572508388082952]
        };
        this.users[2]= {
            _id: "Fritz",
            pos:[48.12311040810709,11.576327853720159]
        };
        this.users[3]= {
            _id: "gfggg",
            pos:[48.122795285986484,11.575673394720525]
        };
        this.lastId = 3;
    },

    find: function (model) {
        return this.users[model.id];
    },

    findAll: function () {
        return _.values(this.users);
    },

    create: function (model) {
        this.lastId++;
        model.set('_id', this.lastId);
        this.users[this.lastId] = model;
        return model;
    },

    update: function (model) {
        this.users[model._id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.users[model._id];
        return model;
    }

};


window.spotStore = {


    spots: {},

    populate: function () {

        this.spots[1]= {
            _id: "AAA",
            pos:[48.123447113611325,11.572508348042952]
        };
        this.spots[2]= {
            _id: "BB",
            pos:[48.12311020814309,11.576327843730159]
        };
        this.spots[3]= {
            _id: "CCC",
            pos:[48.13279545926484,11.575673294723425]
        };
        this.lastId = 3;
    },

    find: function (model) {
        return this.spots[model.id];
    },

    findAll: function () {
        return _.values(this.spots);
    },

    create: function (model) {
        this.lastId++;
        model.set('_id', this.lastId);
        this.spots[this.lastId] = model;
        return model;
    },

    update: function (model) {
        this.spots[model._id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.spots[model._id];
        return model;
    }

};

window.optionStore = {


    options: {},

    populate: function () {

        this.options[1]= {
            _id: "addspot",
            pos:[48.123447113611325,11.572508348042952]
        };
        this.options[2]= {
            _id: "something",
            pos:[48.12311020814309,11.576327843730159]
        };
        this.lastId = 2;
    },

    find: function (model) {
        return this.options[model.id];
    },

    findAll: function () {
        return _.values(this.options);
    },

    create: function (model) {
        this.lastId++;
        model.set('_id', this.lastId);
        this.options[this.lastId] = model;
        return model;
    },

    update: function (model) {
        this.options[model._id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.options[model._id];
        return model;
    }

};



userStore.populate();
spotStore.populate();
optionStore.populate();







// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
/*
Backbone.sync = function (method, model, options) {

    var resp;

    var url = "";
    if (typeof(model.url)== 'function'){
     url = model.url();
    }
    else{
    url = model.url;
    }

    var store = null;
    switch(url){
        case "api/users":
           store = userStore;
           break;
        case "api/spots":
            store = spotStore;
            break;
        case "api/options":
            store = optionStore;
            break;
        default:
            console.log("no store for " + model.url);
            throw "no store for " + model.url;
            break;
    }



    switch (method) {
        case "read":
            resp = model.id ? store.find(model) : store.findAll();
            break;
        case "create":
            resp = store.create(model);
            break;
        case "update":
            resp = store.update(model);
            break;
        case "delete":
            resp = store.destroy(model);
            break;
    }

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};*/
