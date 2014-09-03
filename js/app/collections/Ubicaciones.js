define([
    'jquery',
    'underscore',
    'backbone',
    'models/Ubicacion'
], function($, _, Backbone, Ubicacion){
    var ubicaciones = Backbone.Collection.extend({
        
        initialize: function(){
            console.log("initialize collection");
        },

        model: Ubicacion,

        url: 'data/ubicaciones.json'
        
    });
    //SINGLETON
    return new ubicaciones;
});