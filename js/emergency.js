
// SELENOVIX - Emergency Monitoring System

window.addEventListener("message", function (event) {

    if (event.origin !== window.location.origin) return;

    const data = event.data;

    if (!data || data.type !== "mission-update") return;

    const alerts = [];

    // Update mission resources
    if (data.resources) {

        const resources = data.resources;

        updateEmergencyValue("emergencyOxygen", resources.oxygen);
        updateEmergencyValue("emergencyWater", resources.water);
        updateEmergencyValue("emergencyFood", resources.food);
        updateEmergencyValue("emergencyPower", resources.power);

        if (resources.oxygen <= 30) {
            alerts.push("CRITICAL: Oxygen supply is low. Conserve oxygen.");
        }

        if (resources.water <= 30) {
            alerts.push("WARNING: Water supply is low. Reduce water usage.");
        }

        if (resources.food <= 30) {
            alerts.push("WARNING: Food supply is low. Manage food carefully.");
        }

        if (resources.power <= 30) {
            alerts.push("CRITICAL: Power supply is low. Reduce energy consumption.");
        }
    }

    // Update solar radiation
    if (data.hazard) {

        updateEmergencyValue(
            "emergencyRadiation",
            data.hazard.radiationLevel
        );

        if (data.hazard.status === "DANGER") {
            alerts.push("DANGER: High solar radiation detected. Move to the designated shelter.");
        } else if (data.hazard.status === "WARNING") {
            alerts.push("WARNING: Solar radiation is elevated. Monitor conditions.");
        }
    }

    // Update lunar dust
    if (data.dust) {

        updateEmergencyValue(
            "emergencyDust",
            data.dust.dustLevel
        );

        if (data.dust.status === "DANGER") {
            alerts.push("DANGER: High lunar dust activity. Follow dust protection procedures.");
        } else if (data.dust.status === "WARNING") {
            alerts.push("WARNING: Lunar dust levels are elevated.");
        }
    }

    // Update crew health
    if (data.crew) {

        const crew = data.crew;

        setEmergencyText("emergencyHeartRate", crew.heartRate + " BPM");
        setEmergencyText("emergencyCrewOxygen", crew.oxygenLevel + "%");
        setEmergencyText("emergencyTemperature", crew.temperature + "°C");
        setEmergencyText("emergencyCrewStatus", crew.healthStatus);

        if (crew.healthStatus === "WARNING") {
            alerts.push("WARNING: Crew health readings require attention.");
        }
    }

    // Update overall emergency status
    const overallStatus = document.getElementById("overallStatus");
    const emergencyMessage = document.getElementById("emergencyMessage");

    if (alerts.length > 0) {

        if (overallStatus) {
            overallStatus.textContent = "⚠️ ALERTS DETECTED";
            overallStatus.className = "alert-danger";
        }

        if (emergencyMessage) {
            emergencyMessage.textContent = alerts.join(" ");
        }

    } else {

        if (overallStatus) {
            overallStatus.textContent = "ALL SYSTEMS NORMAL";
            overallStatus.className = "alert-normal";
        }

        if (emergencyMessage) {
            emergencyMessage.textContent =
                "No simulated emergency detected. Continue normal mission operations.";
        }
    }

});


// Update emergency resource values and colours
function updateEmergencyValue(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = value + "%";

    element.classList.remove(
        "alert-normal",
        "alert-warning",
        "alert-danger"
    );

    if (value <= 30) {
        element.classList.add("alert-danger");
    } else if (value <= 60) {
        element.classList.add("alert-warning");
    } else {
        element.classList.add("alert-normal");
    }
}


// Update emergency text values
function setEmergencyText(elementId, value) {

    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = value;
    }
}
