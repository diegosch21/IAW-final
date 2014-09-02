define([
	'jquery',
	'backbone',
	'views/Ubicacion'
], function ($, Backbone, UbicacionView, UbicacionModel) {
	
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
			
		},

		initialize: function(){
			//this.ubicacionModel = new UbicacionModel(); 
			this.ubicacionView = new UbicacionView({el: "#page-ubicacion-0", id: "bb", firstPage: true});
			//this.ubicacionModel.on('reset',, this);

			//this.cambiarPagina(this.ubicacionView);

        	//$('#header').html(this.headerView.el);
        	//this.cambiarPagina = _.bind(cambiarPagina,this);        	
        	//this.getLabos = _.bind(getLabos,this);
		},

		home: function(){
			//$.mobile.changePage( "#" , { reverse: false, changeHash: false } );
			//var self = this;
			//require(['views/Home'], function(HomeView) {
			//	self.cambiarPagina(new HomeView(),'inicio');	
			//});
		}

		// cambiarPagina :function (page) {
		//     $(page.el).attr('data-role', 'page');
		//     $(page.el).attr('data-theme', 'b');
		//     page.render();
		//     $('body').append($(page.el));
		//     var transition = $.mobile.defaultPageTransition;
		//     // We don't want to slide the first page
		//     if (this.firstPage) {
		//         transition = 'none';
		//         this.firstPage = false;
		//     }
		//     $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
		// }

		
	});


	return { init: init };
});