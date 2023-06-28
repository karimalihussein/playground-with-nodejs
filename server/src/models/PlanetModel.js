const fs = require("fs");
const {
  parse
} = require("csv-parse");
const path = require("path");


const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6;
}


function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          // push the planet name to the habitablePlanets array, kepler_name
          habitablePlanets.push(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};