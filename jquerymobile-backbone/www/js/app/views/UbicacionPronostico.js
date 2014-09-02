define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/ubicacion_pronostico.html'
], function ($,_,Backbone,Template) {
	
	var PronosticoView = Backbone.View.extend({

		tagName: 'li',
        id: 'pronostico',

		template: _.template(Template),

		events: {
			
		},

		initialize: function() {
			_.bindAll(this, "render");
			//this.model.on("sync", this.render,this);
		},
		render: function() {
			console.log("Modelo pronostico a renderizar:")
			console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.attr('data-cards-type', 'weather');
			return this;
		}
		
	});

	return PronosticoView;
})