'use strict';
var Region = require("./region");

class World {

  constructor() {
    this.regions = new Map();
  }

  createMap() {
    this.regions.set('Region 1', new Region("Region 1", 1));
    this.regions.set('Region 2', new Region("Region 2", 2));
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
