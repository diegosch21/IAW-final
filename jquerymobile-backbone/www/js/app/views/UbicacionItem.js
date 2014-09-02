define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/ubicacion_item.html'
], function ($,_,Backbone,Template) {
	
	var UbicacionItem = Backbone.View.extend({

		template: _.template(Template),

		tagName: 'li',
		class: "ubicacion-item",

		events: {
			'click .ubicacion-delete': 'quitar',
		},

		initialize: function() {
			_.bindAll(this,"update");
			this.listenTo(this.model, 'remove', this.remove);
			this.model.actual.fetch({success: this.update});
		},
		
		update: function() {
			this.model.set({
				icon: this.model.actual.get("icon"),
				temp: this.model.actual.get("temp"),
				condition: this.model.actual.get("condition")
			});
			this.render();
			$("#ubicaciones-lista").listview('refresh');
		},
		render: function() {
			//console.log(this.model.toJSON());
			
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		quitar: function(e) {
			e.preventDefault();
			this.model.destroy();
		}
		
	});


	return UbicacionItem;
})