define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/ubicacion_page.html',
	'collections/Ubicaciones',
	'views/UbicacionActual',
	'views/UbicacionPronostico'
], function ($,_,Backbone,Template,Ubicaciones,ActualView,PronosticoView) {
	
	var UbicacionView = Backbone.View.extend({

		template: _.template(Template),

		events: {
			
		},

		initialize: function() {
			_.bindAll(this, "render", "firstrender");
			
			this.model = Ubicaciones.get(this.id);
			this.actualView = new ActualView({model: this.model.actual});
			this.pronosticoView = new PronosticoView({model: this.model.pronostico});
			self = this;
			var renderView = _.after(2, this.firstrender);	//luego de llamarse 2 veces se ejecuta this.render
			this.actualView.model.fetch({success: renderView});
			this.pronosticoView.model.fetch({success: renderView});

			// $.when(
			// 	this.actualView.model.fetch(),
			// 	this.pronosticoView.model.fetch()
			// ).done(function(){
			// 	self.render();
			// });
			
		},
		
		update: function() {
			this.actualView.update();
			this.pronosticoView.update();

			this.render();
		},
		firstrender: function() {
			this.$el.html(this.template(this.actualView.model.toJSON()));
			this.$el.find('#vistas').append(this.actualView.render().el,this.pronosticoView.render().el);

			this.render();
		},
		render: function() {
			$.mobile.changePage(this.$el, {changeHash:false});
			return this;
		}
		
	});


	return UbicacionView;
})