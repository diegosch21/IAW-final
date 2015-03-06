define([
    'jquery',
    'underscore',
    'backbone',
    'models/Ubicacion',
    'localstorage'
], function($, _, Backbone, Ubicacion){
    var UbicacionesGuardadas = Backbone.Collection.extend({
        
        initialize: function(){
            
        },

        model: Ubicacion,

        localStorage: new Backbone.LocalStorage('meteobahia-ubicaciones')

        
        
    });
    //SINGLETON
    return new UbicacionesGuardadas;
});