define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/ubicacion_map.html',
	'collections/Ubicaciones',
], function ($,_,Backbone,Template,Ubicaciones) {
	
	var UbicacionView = Backbone.View.extend({

		tagName: 'li',
        class: 'mapa',
		template: _.template(Template),

		events: {

		},

		initialize: function() {
		
		},
		render: function() {
			this.$el.html(this.template());
			this.$el.attr('data-cards-type', 'weather');
			this.mapa();
			return this;
		},
		mapa: function() {
			self = this;
			require(['lib/gmaps'], function(mapa) {
				
				mapa.setCenter(parseFloat(self.model.get('location').lat),parseFloat(self.model.get('location').lng));
				mapa.setZoom(12);
				mapa.render(self.$('#map_canvas')[0]);
				
			});	
		},
		
	});


	return UbicacionView;
})