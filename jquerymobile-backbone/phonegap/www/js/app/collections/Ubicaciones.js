define([
    'jquery',
    'underscore',
    'backbone',
    'models/Ubicacion'
], function($, _, Backbone, Ubicacion){
    var ubicaciones = Backbone.Collection.extend({
        initialize: function(){
        
        },
        model: Ubicacion,

        //url: 

        
    });

    return ubicaciones;
});