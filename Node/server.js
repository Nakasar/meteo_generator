var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser')
  MeteoBot = require('./generator/main')
  cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.listen(port);

generator = new MeteoBot.Generator();
generator.createWorld();

app.get('/', function(req, res) {
  return res.json({ success: true, message: "Welcome on GW2RP meteo generator."});
});

app.get('/world', function(req, res) {
  if (!generator) {
    return res.json({ success: false, message: "Generator is out of service." });
  }

  var world = generator.world.params;

  return res.json({ success: true, world: world });
})

// Change to POST and add Auth
app.get('/reset', function(req, res) {
  if (!generator) {
    return res.json({ success: false, message: "Generator is out of service." });
  }

  generator.generateFullMeteo();
  var meteo = generator.getFullMeteoJson();

  return res.json({ success: true, message: "Full meteo generated.", meteo: meteo})
})

app.get('/all', function(req, res) {
  if (!generator) {
    return res.json({ success: false, message: "Generator is out of service." });
  }

  var meteo = generator.getFullMeteoJson();
  return res.json({ success: true, meteo: meteo });
});

app.get('/:regionName', function(req, res) {
  // Check for param
  if (!req.params.regionName) {
    return res.json({ success: false, message: "This call require a region name" });
  }
  var region = req.params.regionName;

  // Check for generator status
  if (!generator) {
    return res.json({ success: false, message: "Generator is out of service." });
  }

  // Check for region name
  if (!generator.hasRegion(region)) {
    return res.json({ success: false, message: "This region does not exists." });
  }

  var meteoForRegion = generator.getMeteoForRegionJson(region);
  return res.json({ success: true, meteo: meteoForRegion });
});

console.log('GW2RP Meteo Generator server started on: ' + port);
