/* Configuraciones iniciales de jQueryMobile (se carga antes que el script de jqM, por eso bindea el evento) */

define(['jquery'], function ($) {
    $(document).on("mobileinit", function () {

        // Prevents all anchor click handling
        $.mobile.linkBindingEnabled = false;
        // Disabling this will prevent jQuery Mobile from handling hash changes
        $.mobile.hashListeningEnabled = false;
        // can cause calling object creation twice and back button issues are solved
        $.mobile.ajaxEnabled = false;
        $.mobile.pushStateEnabled = false;

        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;

        // Solves phonegap issues with the back-button
        $.mobile.phonegapNavigationEnabled = true;

        // Setting default transition 
        $.mobile.defaultPageTransition = 'slide';
        //$.mobile.defaultDialogTransition = "none";
        
    /*
        $.mobile.page.prototype.options.degradeInputs.date = true;
        $.mobile.page.prototype.options.domCache = false;
    */
    /*
        // enable loading page+icon
        $.mobile.loader.prototype.options.text = "loading";
        $.mobile.loader.prototype.options.textVisible = false;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.html = "";
    */    
    });
});