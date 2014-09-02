require.config({

	baseUrl: 'js/vendor',

	paths: {
        app: '../app',
        lib: '../app/lib',
        views: '../app/views',
        models: '../app/models',
        collections: '../app/collections',
        templates: '../../templates',
        resources: '../../resources',
        data: '../../data',
        text: 'requirejs/requirejs-text',
        async: 'requirejs/requirejs-async',
        jquery: 'jquery-1.11.1.min',
        underscore: 'underscore-1.6.0.min',
        backbone: 'backbone/backbone-1.1.2',
        localstorage: 'backbone/backbone.localStorage-min',
        'jquerymobile-config': '../jquerymobile.config',
        jquerymobile: 'jquerymobile/jquery.mobile-1.4.3.min',
        nativedroid: 'jquerymobile/nativedroid.script',
        xml2json: "../app/lib/jquery.xml2json"
        //modernizr: 'modernizr-2.8.0.min',
        //iscroll: 'iscroll'
    }, 
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore','jquery'],
			exports: 'Backbone'
		},
		localstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		'jquerymobile-config' : ['jquery'],
        jquerymobile : {	//jQueryMobile se carga después de config, que bindea el evento mobileinit
            deps : ["jquery", 'jquerymobile-config']
        },
        nativedroid: {
            deps: ['jquery', 'jquerymobile']
        },
        xml2json: {
            deps:['jquery']
        }
	},
	waitSeconds: 30
});

require(['jquery', 'app/app', 'jquerymobile', 'nativedroid'], 
	function ($, App) {
		App.init();
	}	
);

