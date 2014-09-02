define([
	'jquery',
	'underscore',
	'backbone',
	'collections/Ubicaciones',
	'collections/UbicacionesGuardadas',
	'views/UbicacionItem',
	'lib/geolocalizacion'
	
], function ($,_,Backbone,Ubicaciones,UbicacionesGuardadas,UbicacionItem,Geo) {
	
	var HomeView = Backbone.View.extend({

		//precompilo el template
		//template: _.template(Template),

		el: "#page-home",

		events: {
			'change #select-ubicaciones' : 'selectUbicacion',
			'click #boton-localizacion' : 'geolocalizacion'
		},

		initialize: function() {
			console.log("hola home");
			$( "#mypanel" ).panel();
			$( "#mypanel" ).trigger( "updatelayout" );
			_.bindAll(this,"llenarSelect","addAll","success");
			this.collection = Ubicaciones;
			this.collection.fetch({
				success: this.llenarSelect
			});
			UbicacionesGuardadas.fetch({success: this.addAll});			
			this.listenTo(UbicacionesGuardadas, 'add', this.addUbicacion);
		},
		render: function() {
			//this.$el.html(this.template());
			$.mobile.changePage(this.$el);
			return this;
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
			$('#ubicaciones-lista').append(view.render().el);
			$("#ubicaciones-lista" ).listview( "refresh" );
		},
		addAll: function () {
			UbicacionesGuardadas.each(this.addUbicacion, this);
		},
		geolocalizacion: function() {
			navigator.geolocation.getCurrentPosition(this.success,
				function(){
					console.log("error");
				}
			);
		},
		success: function(pos) {
  			var crd = pos.coords;
			console.log('Your current position is:');
			console.log('Latitude : ' + crd.latitude);
			console.log('Longitude: ' + crd.longitude);
			console.log('More or less ' + crd.accuracy + ' meters.');

			console.log("bb lat: "+this.collection.get('bb').get('location').lat+"lng: "+this.collection.get('bb').get('location').lng);
			console.log(Geo.getDistancia(crd.latitude,crd.longitude,this.collection.get('bb').get('location').lat,this.collection.get('bb').get('location').lng));
			console.log("bb8 lat: "+this.collection.get('bb8').get('location').lat+"lng: "+this.collection.get('bb8').get('location').lng);
			console.log(Geo.getDistancia(crd.latitude,crd.longitude,this.collection.get('bb8').get('location').lat,this.collection.get('bb8').get('location').lng));
		}
		
	});
	//SINGLETON
	return new HomeView;
})