define([
	'jquery',
	'underscore',
	'backbone',
	'collections/Ubicaciones',
	'collections/UbicacionesGuardadas',
	'views/UbicacionItem',
	'lib/geolocalizacion',
	'views/UbicacionItemCerca',
	'views/Panel'
	
], function ($,_,Backbone,Ubicaciones,UbicacionesGuardadas,UbicacionItem,Geo,UbicacionCerca,Panel) {
	
	var HomeView = Backbone.View.extend({

		//precompilo el template
		//template: _.template(Template),

		el: "#page-home",

		events: {
			'change #select-ubicaciones' : 'selectUbicacion',
			//'click #boton-agregar'	: "openSelect", 
			'click #boton-localizacion' : 'geolocalizacion',
			'click #ubicacion-actual-actualizar' : 'geolocalizacion',
			'click #ubicacion-actual-link' : 'addActual',
			'click #boton-actualizar-ubicaciones' : 'updateUbicaciones',
			'click .ubicacion-link' : 'loading'

		},

		initialize: function() {
			console.log("hola home");
			_.bindAll(this,"llenarSelect","addAll","setCercano");
			this.collection = Ubicaciones;
			this.listenTo(UbicacionesGuardadas, 'add', this.addUbicacion);
			this.listenTo(UbicacionesGuardadas, 'remove', this.removeUbicacion);
		},
		render: function() {
			//this.$el.html(this.template());
			$.mobile.changePage(this.$el);
			console.log("hola");
			this.setPanel();
			return this;
		},
		cargar: function() {
			//UbicacionesGuardadas.fetch({success: this.addAll});	
			UbicacionesGuardadas.fetch();	
		},
		llenarSelect: function(){
			console.log(this.collection);
			var model, option;
			var grupo_bahia="", grupo_baires="", grupo_costa="", grupo_patagonia="";
			for(var i=0; i<this.collection.length; i++) {
  				model = this.collection.models[i];
  				option = "<option value="+model.id+">"+model.get("name")+"</option>";
  				switch(model.get("region")) {
  					case "sudoeste_bonaerense":
  						grupo_bahia+=option;
  						break;
  					case "conurbano_bonaerense":
  						grupo_baires+=option;
  						break;
  					case "costa_atlantica":
  						grupo_costa+=option;
  						break;
  					case "patagonia_norte":
  						grupo_patagonia+=option;
  						break;			

  				}
			};
			$("#optgroup-bahia").html(grupo_bahia);
			$("#optgroup-baires").html(grupo_baires);
			$("#optgroup-costa").html(grupo_costa);
			$("#optgroup-patagonia").html(grupo_patagonia);
		},
		selectUbicacion: function() {
			var id = $("#select-ubicaciones").val();
			var model = this.collection.get(id);
			//console.log(model);
			UbicacionesGuardadas.create(model.toJSON());
			console.log(UbicacionesGuardadas);
		},
		addUbicacion: function(ubicacion) {
			var view = new UbicacionItem({model: ubicacion});
			view.refresh();
			$('#ubicaciones-lista').prepend(view.render().el);
			$("#ubicaciones-lista" ).listview( "refresh");			
			this.ubicacionesViews[ubicacion.id] = view;
		},
		addAll: function () {
			//UbicacionesGuardadas.each(this.addUbicacion, this);
		},
		addActual: function() {
			UbicacionesGuardadas.create(this.ubicacionItemCerca.model.toJSON());
		},
		ubicacionesViews: {},
		updateUbicaciones: function(e) {
			e.preventDefault();
			console.log(this.ubicacionesViews);
			$.each(this.ubicacionesViews, function(index, val) {
				val.refresh();
			});
		},
		removeUbicacion: function(ubicacion) {
			delete this.ubicacionesViews[ubicacion.id];
		},
		geolocalizacion: function(e) {
			e.preventDefault();
			$("#ubicacion-encontrar").show();
			$("#ubicacion-cercana").hide();
			$("#boton-localizacion").hide();
			$("#loading-localizacion").show();
			self = this;
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					function(pos) {
						console.log('Coordenadas locales: Lat='+pos.coords.latitude+",Lng="+pos.coords.longitude);
						var cercano = Geo.buscarCercano(pos.coords.latitude,pos.coords.longitude,self.collection);
						self.setCercano(cercano.id,cercano.distancia);
					},
					function(err){
						alert("Error al obtener geolocalizacion. ["+err.message +']');
						$("#boton-localizacion").show();
						$("#loading-localizacion").hide();
					},
					{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
				);	
			}
			
		},
		setCercano: function(id,dist) {
			if(!this.ubicacionItemCerca)
				this.ubicacionItemCerca = new UbicacionCerca({el: "#ubicacion-cercana", model: this.collection.get(id), distancia: dist});
			this.ubicacionItemCerca.render();
		},
		setPanel: function() {
			Panel.setElement($("#panel-home"));
			Panel.render();
		},
		loading: function() {
			$('body').addClass("loading");
		}

		
	});
	//SINGLETON
	return new HomeView;
})