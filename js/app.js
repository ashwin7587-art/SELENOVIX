
// SELENOVIX - Main Application

document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.getElementById("startMission");

    let missionStarted = false;

    startButton.addEventListener("click", function () {

        if (missionStarted) {
            alert("Your lunar mission is already running!");
            return;
        }

        missionStarted = true;

        alert(
            "Welcome, Junior Astronaut!\n\n" +
            "Your Lunar South Pole mission has started!\n\n" +
            "Monitor your resources and environmental hazards carefully."
        );

        // Consume mission resources
        consumeResources();

        // Update resource dashboard
        updateResourceDashboard();

        // Start mission timer
        startMissionTimer();

        // Simulate solar radiation
        updateSolarRadiation();

        // Change button text
        startButton.textContent = "Mission In Progress";
    });

});

// Update resource values
function updateResourceDashboard() {

    const resources = getMissionResources();

    document.getElementById("oxygenValue").textContent =
        resources.oxygen + "%";

    document.getElementById("waterValue").textContent =
        resources.water + "%";

    document.getElementById("foodValue").textContent =
        resources.food + "%";

    document.getElementById("powerValue").textContent =
        resources.power + "%";
}

// Update solar radiation monitor
function updateSolarRadiation() {

    const hazard = simulateSolarRadiation();

    document.getElementById("radiationValue").textContent =
        hazard.radiationLevel + "%";

    document.getElementById("radiationStatus").textContent =
        hazard.status;

    if (hazard.status === "DANGER") {
        alert("DANGER! High solar radiation detected. Protect your crew!");
    } else if (hazard.status === "WARNING") {
        alert("WARNING! Solar radiation is increasing. Monitor your crew!");
    }
}
