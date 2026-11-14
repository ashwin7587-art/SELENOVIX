// SELENOVIX - Crew Health and Safety System

const crewStatus = {
    heartRate: 75,
    oxygenLevel: 98,
    temperature: 37,
    healthStatus: "Normal"
};

// Simulate astronaut health conditions
function simulateCrewHealth() {

    crewStatus.heartRate = Math.floor(Math.random() * 31) + 60;

    crewStatus.oxygenLevel = Math.floor(Math.random() * 11) + 90;

    crewStatus.temperature =
        Number((36.5 + Math.random() * 1.5).toFixed(1));

    if (
        crewStatus.heartRate > 100 ||
        crewStatus.oxygenLevel < 94 ||
        crewStatus.temperature > 37.5
    ) {
        crewStatus.healthStatus = "WARNING";
    } else {
        crewStatus.healthStatus = "Normal";
    }

    console.log("Crew Health:", crewStatus);

    return crewStatus;
}

// Get current crew health information
function getCrewStatus() {
    return crewStatus;
}