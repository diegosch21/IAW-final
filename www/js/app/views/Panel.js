define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/panel.html',
	'collections/UbicacionesGuardadas',
	'views/UbicacionItem',
	'views/UbicacionItemCerca'
	
], function ($,_,Backbone,Template,UbicacionesGuardadas,UbicacionItem,UbicacionCerca) {
	
	var PanelView = Backbone.View.extend({

		//precompilo el template
		template: _.template(Template),

		events: {
		
		},


		render: function() {
			this.$el.html(this.template());
			this.$el.trigger( "updatelayout" );
//  			$("#lista-panel").listview("refresh");  			
			return this;
		},

		updateUbicaciones: function() {
			console.log(UbicacionesGuardadas.toJSON());
		},
		updateActual: function() {
			
		},
		
	});
	//SINGLETON
	return new PanelView;
})