define(function() {

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }


    function buscarMasCercano(lat,lng,collection) {
        var model, location, d;
        var minDist = Number.MAX_VALUE;
        var minId = "";

        for (var i = collection.length - 1; i >= 0; i--) {
            model = collection.at(i);
            location = model.get("location");
            d = getDistanceFromLatLonInKm(lat,lng,location.lat,location.lng);
            console.log("ID: "+model.id+" Dist: "+d);
            if (d < minDist) {
                minDist = d; minId = model.id;
            }
        };
        return {
            id: minId,
            distancia: minDist
        };
    }
    

    return {
        getDistancia: getDistanceFromLatLonInKm,
        buscarCercano: buscarMasCercano
    };


});


