class Region {
  constructor(regionName, regionId) {
    this.name = regionName;
    this.id = regionId;
    this.generated = false;
  }

  static parse(json) {
    var name = json.region_name,
      id = json.region_id;
    // parse parameters
    return new Region(name, id)
  }

  generate() {
    // generate data for this region
    //TODO: Replace by appropriate generation

    this.temperature = Math.floor(Math.random() * 30) + 1;
    // generate wind
    var randomizeWind = Math.random();
    if (randomizeWind > 0.8) {
      this.wind = "north cold";
    } else if (randomizeWind > 0.6) {
      this.wind = "north hot"
    } else {
      this.wind = "none"
    }
    // generate sky
    var randomizeSky = Math.random();
    if (randomizeSky > 0.5) {
      this.sky = "sunny";
    } else if (randomizeWind > 0.4) {
      this.sky = "rainy"
    } else {
      this.sky = "grey"
    }

    this.generated = true;
  }

  toJson() {
    var json = { };

    json["region_name"] = this.name;
    json["region_id"] = this.id;
    json["generated"] = this.generated;

    if (this.generated) {
      var data = { };

      // Fill JSON with data
      data["temperature"] = this.temperature;
      data["wind"] = this.wind;
      data["sky"] = this.sky;

      json["data"] = data;
    }

    return json;
  }
}

module.exports = Region;
