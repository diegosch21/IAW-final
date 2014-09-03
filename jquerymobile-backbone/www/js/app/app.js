define([
	'jquery',
	'backbone',
	'views/Home',
	'views/UbicacionPage',
	'collections/Ubicaciones'
], function ($, Backbone, HomeView,UbicacionView,Ubicaciones) {
	
	function init() {
		/* Document ready */
		$(function() {
			eventHandlersGenerales();
			Ubicaciones.fetch({
				success: HomeView.llenarSelect
			})
			HomeView.cargar();
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
			"": "home",
			"ubicacion/:id" : "ubicacion"
		},

		initialize: function(){
			this.homeView = HomeView;
		},
		home: function() {
			this.homeView.render();
		},

		ubicacion: function(id){
			if(!this.ubicaciones[id]){
				var el = this.nuevaPagina(id);
				this.ubicaciones[id] = new UbicacionView({el: el, id: id});	
			}
			else {
				this.ubicaciones[id].update();
			}

			//$.mobile.changePage( "#" , { reverse: false, changeHash: false } );
			//var self = this;
			//require(['views/Home'], function(HomeView) {
			//	self.cambiarPagina(new HomeView(),'inicio');	
			//});
		},

		ubicaciones: {},

		nuevaPagina: function(id) {
			var el = $('<div data-role="page" data-theme="b" id="page-ubicacion-'+id+'"></div>');
			//$('body').append(el);
			el.appendTo( $.mobile.pageContainer );
			return el;
		},
		// cambiarPagina: function(view) {
		// 	var transition = $.mobile.defaultPageTransition;
		//    // We don't want to slide the first page
		//     if (this.firstPage) {
		//         transition = 'none';
		//         this.firstPage = false;
		//     }
		//     $.mobile.changePage(view.render().$el, {changeHash:false, transition: transition});
		// }
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