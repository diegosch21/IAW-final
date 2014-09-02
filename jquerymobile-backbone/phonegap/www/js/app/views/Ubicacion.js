define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/ubicacion.html',
	'models/Ubicacion',
	'views/UbicacionActual',
	'views/UbicacionPronostico'
], function ($,_,Backbone,Template,Ubicacion,ActualView,PronosticoView) {
	
	var UbicacionView = Backbone.View.extend({

		template: _.template(Template),

		events: {
			
		},

		initialize: function() {
			_.bindAll(this, "render");
			this.actualView = new ActualView({model: new Ubicacion.actual({id: this.id})});
			this.pronosticoView = new PronosticoView({model: new Ubicacion.pronostico({id: this.id})});
			self = this;

			var renderView = _.after(2, this.render);	//luego de llamarse 2 veces se ejecuta this.render
			this.actualView.model.fetch({success: renderView});
			this.pronosticoView.model.fetch({success: renderView});

			// $.when(
			// 	this.actualView.model.fetch(),
			// 	this.pronosticoView.model.fetch()
			// ).done(function(){
			// 	self.render();
			// });
			
		},
		render: function() {
			this.$el.html(this.template(this.actualView.model.toJSON()));
			this.$el.find('#vistas').append(this.actualView.render().el,this.pronosticoView.render().el);
			var transition = $.mobile.defaultPageTransition;
		   // We don't want to slide the first page
		    if (this.firstPage) {
		        transition = 'none';
		        this.firstPage = false;
		    }
		    $.mobile.changePage(this.$el, {changeHash:false, transition: transition});
			return this;
		}
		
	});


	return UbicacionView;
})