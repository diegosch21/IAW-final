define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/ubicacion_actual.html'
], function ($,_,Backbone,Template) {
	
	var ActualView = Backbone.View.extend({
	
        tagName: 'li',
        class: 'actual',

		template: _.template(Template),

		events: {
			
		},

		initialize: function() {
			_.bindAll(this, "render");
			//this.model.on("sync", this.render,this);
		},
		update: function() {
			this.model.fetch({success: this.render});
		},
		render: function() {
			//console.log("Modelo datos actuales a renderizar:")
			//console.log(this.model.toJSON());
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.attr('data-cards-type', 'weather');
			return this;
		}
		
	});

	return ActualView;
})