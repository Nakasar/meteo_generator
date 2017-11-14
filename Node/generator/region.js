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
