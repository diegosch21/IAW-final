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

		routes: {
			""					: "home",
			"page2"				: "page2"
		},

		initialize: function(){
			//this.headerView = new HeaderView();
        	//$('#header').html(this.headerView.el);
        	//this.cambiarPagina = _.bind(cambiarPagina,this);        	
        	//this.getLabos = _.bind(getLabos,this);
		},

		home: function(){
			$.mobile.changePage( "#" , { reverse: false, changeHash: false } );
			//var self = this;
			//require(['views/Home'], function(HomeView) {
			//	self.cambiarPagina(new HomeView(),'inicio');	
			//});
		},
		page2: function() {
			$.mobile.changePage( "#page2" , { reverse: true, changeHash: false } );
		}

		
	});

	return { init: init };
});