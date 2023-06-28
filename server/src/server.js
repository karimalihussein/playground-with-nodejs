const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/PlanetModel');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

async function startServer() {
    await loadPlanetsData();

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

startServer();

