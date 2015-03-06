define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/ubicacion_page.html',
	'collections/Ubicaciones',
	'views/UbicacionActual',
	'views/UbicacionPronostico',
	'views/UbicacionMapa',
	'views/Panel'
], function ($,_,Backbone,Template,Ubicaciones,ActualView,PronosticoView,MapView,Panel) {
	
	var UbicacionView = Backbone.View.extend({

		template: _.template(Template),

		events: {
			'click .boton-actualizar-ubicacion' : 'update'
		},

		initialize: function() {
			_.bindAll(this, "render", "firstrender", "cargarDatos");
			
			if (Ubicaciones.length == 0)  //si se entra a la app por esta page
				Ubicaciones.fetch({success: this.cargarDatos })
			else
				this.cargarDatos();
			
		
		},
		cargarDatos: function() {
			this.model = Ubicaciones.get(this.id);
			this.actualView = new ActualView({model: this.model.actual});
			this.pronosticoView = new PronosticoView({model: this.model.pronostico});
			this.mapView = new MapView({model: this.model});
			self = this;
			var renderView = _.after(2, this.firstrender);	//luego de llamarse 2 veces se ejecuta this.render
			this.actualView.model.fetch({success: renderView});
			this.pronosticoView.model.fetch({success: renderView});
		},
		
		update: function() {
			this.actualView.update();
			this.pronosticoView.update();

			this.render();
		},
		firstrender: function() {
			this.$el.html(this.template(this.actualView.model.toJSON()));
			this.$el.find('#vistas').append(
				this.actualView.render().el,
				this.pronosticoView.render().el,
				this.mapView.render().el);

			this.render();
		},
		render: function() {
			$.mobile.changePage(this.$el, {changeHash:false});
			$('body').removeClass("loading");
			this.setPanel();
			return this;
		},
		setPanel: function() {
			Panel.setElement($("#panel-ubicacion-"+this.id));
			Panel.render();
		}
		
	});


	return UbicacionView;
})