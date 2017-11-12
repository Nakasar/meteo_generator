NodeJS Meteo Generator
======================

Overview
--------

Installation
-----------
First, ensure that [Node.Js ](https://nodejs.org/en/) (developed for v8.9.1, check your version using `node -v`) is installed on your computer. Npm should be installed with NodeJs (check using `npm -v`).

Clone the project on your computer/server : `git clone https://github.com/Nakasar/meteo_generator` in the desired folder.

Open a system terminal, navigate in the cloned folder, and install project modules (defined in `package.json`) by typing `npm install`. It may take a while depending on your internet connection.

Great ! Now you're ready to generate meteo !

Usage
-----
### Starting server
* **For developpment :** Open a system terminal, navigate to the cloned folder, and type `npm run start`.
* **For production :** I recommend using forever to run your script. Install forever using `npm install -g forever` then start server using `forever start server.js`.

Your server is now running. Access to it on `localhost:3000/`.

### Endpoints
| address | method | description |
| ------- | ------ | ----------- |
| **/**   | GET    | Check if server is up and running ! |
| **/reset** | POST | Reset meteo from scratch. |
| **/all** | GET   | Get full world meteo as json. |
| **/\<regionId\>** | GET | Get meteo as json for the given region. |

### World creation
The world is created upon a written json file on the server. It contains a list of region with their parameters.
```javascript
[
  {
    "region_name": "Krytia",
    "region_id": 1,
    "seasons": [
      {
        "season_name" : "Summer",
        "max_temperature": 30,
        "min_temperature": 10,
        "skies": [
          {
            "name": "Sunny",
            "probability": 0.753
          },
          {
            "name": "Rainy",
            "probability": 0.125
          }
        ]
      }
    ]
  },
  {
    "region_name": "Ascalon",
    "region_id": 16
  }
]
```

### Data Format
All endpoints returns json data containing a boplean success field.

When requesting meteo for a given region, you will receive a json containing the following fields :

```javascript
{
  region_name: "Queensdale",
  region_id: 1,
  generated: false
}
```

```javascript
{
  region_name: "Queensdale",
  region_id: 1,
  generated: true,
  wind: "none",
  temperature: 25,
  sky: "sunny"
}
```

When requesting the `/all` endpoint, or several regions, you will recieved a json Object indexed by the names of regions :
```javascript
[
  "Queensdale" : {
  {
    region_name: "Queensdale",
    region_id: 1,
    generated: true,
    wind: "none",
    temperature: 25,
    sky: "sunny"
  },
  "Rata Sum": {
  {
    region_name: "Rata Sum",
    region_id: 16,
    generated: true,
    wind: "Strong North Cold",
    temperature: 15,
    sky: "Rainy"
  }
]
```
