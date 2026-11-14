
// SELENOVIX - Lunar Dust Hazard Monitor

const dustHazard = {
    dustLevel: 15,
    status: "Normal"
};

// Simulate lunar dust conditions
function simulateLunarDust() {

    dustHazard.dustLevel = Math.floor(Math.random() * 81) + 10;

    if (dustHazard.dustLevel >= 75) {
        dustHazard.status = "DANGER";
    } else if (dustHazard.dustLevel >= 45) {
        dustHazard.status = "WARNING";
    } else {
        dustHazard.status = "Normal";
    }

    console.log("Lunar Dust Conditions:", dustHazard);

    return dustHazard;
}

// Get current dust information
function getDustHazard() {
    return dustHazard;
}
