define([
	'jquery',
	'backbone'
], function ($, Backbone) {
	
	function init() {
		/* Document ready */
		$(function() {
			eventHandlersGenerales();
		});
		/* Device ready (Phonegap) */
		document.addEventListener("deviceready", onDeviceReady, false);

		this.router = new appRouter();
		Backbone.history.start();
	}

	function onDeviceReady() {
    	// Now safe to use device APIs
    	console.log("device ready");
	}
	function eventHandlersGenerales() {
		console.log("document ready");
	}

	var appRouter = Backbone.Router.extend({

	});

	return { init: init };
});