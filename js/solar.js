
// SELENOVIX - Solar Radiation Hazard System

const solarHazard = {
    radiationLevel: 20,
    status: "Normal"
};

// Simulate a solar radiation event
function simulateSolarRadiation() {

    solarHazard.radiationLevel =
        Math.floor(Math.random() * 81) + 20;

    if (solarHazard.radiationLevel >= 80) {
        solarHazard.status = "DANGER";
    } else if (solarHazard.radiationLevel >= 50) {
        solarHazard.status = "WARNING";
    } else {
        solarHazard.status = "Normal";
    }

    console.log("Solar Radiation:", solarHazard);
    
    return solarHazard;
}

// Get current solar hazard information
function getSolarHazard() {
    return solarHazard;
}
