define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/main.html'
], function ($,_,Backbone,Template) {
	
	var MainView = Backbone.View.extend({

		//precompilo el template
		template: _.template(Template),

		events: {
			
		},

		initialize: function() {
			
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
		
	});

	return HomeView;
})