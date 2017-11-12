'use strict';
var World = require('./world');

class Generator {

  constructor() {
    this.world = new World();
  }

  sayHello() {
    return "Hello World !";
  }

  createWorld() {
    this.world.createMap();
  }

  generateFullMeteo() {
    this.world.generateAll();
  }

  getFullMeteo() {
    return this.world;
  }

  getFullMeteoJson() {
    var worldJson = this.world.toJson();
    return worldJson;
  }

  hasRegion(region) {
    return this.world.hasRegion(region);
  }

}

module.exports = Generator;
