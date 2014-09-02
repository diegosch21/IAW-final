define([
    'jquery',
    'underscore',
    'backbone',
    'xml2json'
], function($, _, Backbone) {

    var UbicacionActual = Backbone.Model.extend({

    	id: "bb", 
    	url: function() {
    		return "http://www.corsproxy.com/meteorologia.cerzos-conicet.gob.ar/mobile/xml/now-"+this.id+".xml";
    	},
    	
        defaults: {
        	ubicacion_id: "def",
        	name: "default",
        	city: "-",
        	province: "-",
        	country: "-",
            location: {
                lat: 0,
                lng: 0, 
                alt: 0
            },
        	temp: 0,
        	icon: "http://www.meteorologia.cerzos-conicet.gov.ar/mobile/iconos/1.png" ,
        	condition: "-",
        	st: 0,
        	pp: 0,
        	hmid: 0,
        	wind_sp: 0,
        	wind_dir: "-",
        	pres: 0,
        	time: "00:00",
        	date: "1/1/2014",
        	institute: "default"
        },
        
        fetch: function(options) {
        	options || (options = {});
        	if (!options.crossDomain) {
      			options.crossDomain = true;
    		}
     		options.dataType = 'xml'; // We're expecting XML from the server.
        	Backbone.Model.prototype.fetch.call(this, options);
    	},
    	
    	parse: function(response) {
    		var parsed = $.xml2json(response);
    		console.log("XML datos actuales:");
    		console.log(parsed);
    		var data = {
    			ubicacion_id: this.id,
	        	name: parsed.Station.name,
	        	city: parsed.Station.city,
	        	province: parsed.Station.province,
	        	country: parsed.Station.country,
	        	temp: parsed.cc.temp,
	        	condition: parsed.cc.condition,
	        	st: parsed.cc.st,
	        	pp: parsed.cc.pp,
	        	hmid: parsed.cc.hmid,
	        	wind_sp: parsed.cc.wind_sp,
	        	wind_dir: parsed.cc.wind_dir,
	        	pres: parsed.cc.pres,
	        	time: parsed.cc.time,
	        	date: parsed.cc.date,
	        	institute: parsed.Station.institute,
                location: {
                    lat: parsed.Station.lat,
                    lng: parsed.Station.lon,
                    alt: parsed.Station.alt
                }
	    	}
            if(parsed.cc.dir.img)
                data.icon = parsed.cc.dir.img.src;
            else
                data.icon = "";
            return data;

    	}
    });

	var UbicacionPronostico = Backbone.Model.extend({
		
		id: "bb",
		url: function() {
    		return "http://www.corsproxy.com/meteorologia.cerzos-conicet.gob.ar/mobile/forecast/for-"+this.id+".xml";
    	},
        defaults: {
        	ubicacion_id: "def",
        	name: "default",
        	actualizado: "00.00 hs",
        	sol: {
        		sale: "00:00",
        		pone: "00:00"
        	},
        	location: {
        		lat: "-",
        		long: "-",
        		alt: "-"
        	},
        	dias:
        	[
        		{
        			dia: 0,
        			fecha: "01/01/2000",
        			icon: "http://www.meteorologia.cerzos-conicet.gov.ar/mobile/iconos/1.png",
        			descrip: "-",
        			temp_max: 0,
        			temp_min: 0,
        			nubosidad: 0,
        			presion: 0,
        			hum: 0,
        			viento_vel: 0,
        			viento_dir: "",
        			precip: 0
        		}
        	]
        },
        
        fetch: function(options) {
        	options || (options = {});
        	if (!options.crossDomain) {
      			options.crossDomain = true;
    		}
     		options.dataType = 'xml'; // We're expecting XML from the server.
        	Backbone.Model.prototype.fetch.call(this, options);
    	},

    	parse: function(response) {
    		var parsed = $.xml2json(response);
    		console.log("XML pronostico:");
    		console.log(parsed);
    	 	data = {
    	 	   	ubicacion_id: this.id,
        		name: parsed.forecast.tabular.station.name,
        		actualizado: parsed.forecast.tabular.actualizado.value,
        		sol: {
        			sale: parsed.forecast.tabular.sun.sunrise,
        			pone: parsed.forecast.tabular.sun.sunset
        		},
        		location: parsed.forecast.tabular.location,
        		dias: []
        	}	
        	for (var i = 0; i < parsed.forecast.tabular.day.length; i++) {
        		var d = parsed.forecast.tabular.day[i];
        		data.dias[i] = {
        			dia: d.dia.value,
        			fecha: d.fecha.value,
        			icon: "http://www.meteorologia.cerzos-conicet.gov.ar/mobile/iconos/"+d.tiempo.value,
        			descrip: d.descrip.value,
        			temp_max: d.tmax.value,
        			temp_min: d.tmin.value,
        			nubosidad: d.nubosidad.value,
        			presion: d.pres.value,
        			hum: d.hum.value,
        			viento_vel: d.viento.value,
        			viento_dir: d.dir.value,
        			precip: d.precip.value 
        		}
        	};
        	return data;
        }
        	
    		
	});
    return { 
    	actual: UbicacionActual,
    	pronostico: UbicacionPronostico 
    }

});