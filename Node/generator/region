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
    this.temperature = 15;
    this.wind = "none";
    this.sky = "sunny";

    this.generated = true;
  }

  toJson() {
    var json = { };

    json["region_name"] = this.name;
    json["region_id"] = this.id;
    json["generated"] = this.generated;

    if (this.generated) {
      // Fill JSON with data
      json["temperature"] = this.temperature;
      json["wind"] = this.wind;
      json["sky"] = this.sky;
    }

    return json;
  }
}

module.exports = Region;
