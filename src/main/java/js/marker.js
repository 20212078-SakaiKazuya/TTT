'use strict'

function marker(latitude, longitude, name){
    data = {
        "type": "FeatureCollection",
    	"features": [
    		{
    			"type": "Feature",
    			"geometry":
    				{
    					"type": "Point",
    					"coordinates": [longitude, latitude]
    				},
    			"properties":
    				{
    					"name": name,
    				}
    		}
        ]
    }
    
}