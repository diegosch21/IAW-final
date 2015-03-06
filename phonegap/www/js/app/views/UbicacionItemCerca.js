define([
	'jquery',
	'underscore',
	'backbone'
], function ($,_,Backbone) {
	
	var UbicacionItemCerca = Backbone.View.extend({

		events: {
		},

		initialize: function(options) {
			_.bindAll(this,"update","render");
			this.distancia = options.distancia;
		},
		
		render: function() {
			$("#ubicacion-actual-link").attr('href', '#ubicacion/'+this.model.id);
			$("#ubicacion-actual-name").html(this.model.get("name"));
			$("#ubicacion-encontrar").hide();
			$("#ubicacion-cercana").show();
			var dist = "A "+parseFloat(this.distancia).toFixed(2)+"km."
			$("#ubicacion-actual-distancia").html(dist);
			$("#ubicacion-actual").listview('refresh');
			this.model.actual.fetch({success: this.update});
			return this;
		},
		update: function() {
			this.model.set({
				icon: this.model.actual.get("icon"),
				temp: this.model.actual.get("temp"),
				condition: this.model.actual.get("condition"),
				time:  this.model.actual.get("time")
			});
			$("#ubicacion-actual-icon").attr('src', this.model.get("icon"));
			$("#ubicacion-actual-temp").html(this.model.get("temp")+"&deg;");
			$("#ubicacion-actual-estado").html(this.model.get("condition"));
			$("#ubicacion-actual-hora").html("("+this.model.get("time")+"hs.)");
			$("#loading-ubicacion-cerca").hide();
			$("#ubicacion-actual-icon").show();
			$("#ubicacion-actual").listview('refresh');
			
		}
		
		
	});


	return UbicacionItemCerca;
})