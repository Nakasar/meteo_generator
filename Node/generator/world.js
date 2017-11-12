'use strict';
var Region = require("./region");
var worldjson = require("./data/world_data");

class World {

  constructor() {
    this.regions = new Map();
  }

  createMap() {
    if (worldjson) {
      console.log(worldjson);
      for (var i = 0; i < worldjson.length; i++) {
        this.regions.set(worldjson[i].region_name, Region.parse(worldjson[i]));
      }
    }
  }

  generateAll() {
    // Code to generator meteo data.
    this.regions.forEach(function(region, regionName, map) {
      region.generate();
    })
  }

  hasRegion(region) {
    return this.regions.has(region);
  }

  toJson() {
    // convert meteo data to json format.
    var mapJson = {};
    this.regions.forEach(function(value, regionName, map) {
      mapJson[regionName] = value.toJson();
    })

    return mapJson;
  }

}

module.exports = World;
