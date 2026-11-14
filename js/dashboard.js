
// SELENOVIX - Connected Mission Dashboard

document.addEventListener("DOMContentLoaded", function () {

    // Start mission resources
    consumeResources();
    updateResourceDashboard();
    startResourceConsumption();

    // Start mission timer
    startMissionTimer();

    // Start environmental monitors
    updateSolarRadiation();
    updateDustMonitor();

    // Start crew health monitoring
    updateCrewHealth();

    // Send all mission data to the main page every second
    setInterval(function () {

        const resources = getMissionResources();
        const hazard = getSolarHazard();
        const dust = getDustHazard();
        const crew = getCrewStatus();

        const hours = Math.floor(missionSeconds / 3600);
        const minutes = Math.floor((missionSeconds % 3600) / 60);
        const seconds = missionSeconds % 60;

        const missionTime =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        window.parent.postMessage({

            type: "mission-update",

            missionTime: missionTime,

            resources: {
                oxygen: resources.oxygen,
                water: resources.water,
                food: resources.food,
                power: resources.power
            },

            hazard: {
                radiationLevel: hazard.radiationLevel,
                status: hazard.status
            },

            dust: {
                dustLevel: dust.dustLevel,
                status: dust.status
            },

            crew: {
                heartRate: crew.heartRate,
                oxygenLevel: crew.oxygenLevel,
                temperature: crew.temperature,
                healthStatus: crew.healthStatus
            }

        }, window.location.origin);

    }, 1000);


    // Refresh environmental hazards every 15 seconds
    setInterval(function () {
        updateSolarRadiation();
        updateDustMonitor();
    }, 15000);


    // Refresh crew health every 10 seconds
    setInterval(function () {
        updateCrewHealth();
    }, 10000);

});


// Update resource values
function updateResourceDashboard() {

    const resources = getMissionResources();

    updateDashboardValue("oxygenValue", resources.oxygen);
    updateDashboardValue("waterValue", resources.water);
    updateDashboardValue("foodValue", resources.food);
    updateDashboardValue("powerValue", resources.power);
}


// Update individual dashboard values and colours
function updateDashboardValue(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = value + "%";

    element.classList.remove(
        "status-normal",
        "status-warning",
        "status-danger"
    );

    if (value >= 70) {
        element.classList.add("status-normal");
    } else if (value > 30) {
        element.classList.add("status-warning");
    } else {
        element.classList.add("status-danger");
    }
}


// Update solar radiation monitor
function updateSolarRadiation() {

    const hazard = simulateSolarRadiation();

    updateDashboardValue("radiationValue", hazard.radiationLevel);
    updateDashboardStatus("radiationStatus", hazard.status);
}


// Update lunar dust monitor
function updateDustMonitor() {

    const dust = simulateLunarDust();

    updateDashboardValue("dustValue", dust.dustLevel);
    updateDashboardStatus("dustStatus", dust.status);
}


// Update crew health monitor
function updateCrewHealth() {

    const crew = simulateCrewHealth();

    const heartRate = document.getElementById("heartRateValue");
    const oxygen = document.getElementById("crewOxygenValue");
    const temperature = document.getElementById("temperatureValue");

    if (heartRate) {
        heartRate.textContent = crew.heartRate + " BPM";
    }

    if (oxygen) {
        oxygen.textContent = crew.oxygenLevel + "%";
    }

    if (temperature) {
        temperature.textContent = crew.temperature + "°C";
    }

    updateDashboardStatus("crewHealthStatus", crew.healthStatus);
}


// Update hazard and health status colours
function updateDashboardStatus(elementId, status) {

    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = status;

    element.classList.remove(
        "status-normal",
        "status-warning",
        "status-danger"
    );

    if (status === "DANGER") {
        element.classList.add("status-danger");
    } else if (status === "WARNING") {
        element.classList.add("status-warning");
    } else {
        element.classList.add("status-normal");
    }
}
