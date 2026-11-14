
// SELENOVIX - Main Application

document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.getElementById("startMission");

    if (!startButton) return;

    let missionStarted = false;

    startButton.addEventListener("click", function () {

        if (missionStarted) {
            document.getElementById("dashboardOverlay").style.display = "flex";
            return;
        }

        missionStarted = true;

        // Create dashboard overlay
        const overlay = document.createElement("div");
        overlay.id = "dashboardOverlay";

        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

        // Dashboard panel
        const panel = document.createElement("div");

        panel.style.cssText = `
            width: 90%;
            max-width: 850px;
            height: 85vh;
            background: #071a35;
            border: 2px solid #32e875;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
        `;

        // Close button
        const closeButton = document.createElement("button");
        closeButton.textContent = "✕ Close";

        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 5;
            padding: 8px 14px;
            cursor: pointer;
        `;

        closeButton.addEventListener("click", function () {
            overlay.style.display = "none";
        });

        // Dashboard iframe
        const frame = document.createElement("iframe");
        frame.src = "dashboard.html";

        frame.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
        `;

        panel.appendChild(closeButton);
        panel.appendChild(frame);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        startButton.textContent = "Mission In Progress";

    });

});

// Receive dashboard updates
window.addEventListener("message", function (event) {

    if (event.origin !== window.location.origin) return;

    const data = event.data;

    if (!data || data.type !== "mission-update") return;

    // Update mission timer
    const timer = document.getElementById("missionTimer");

    if (timer && data.missionTime) {
        timer.textContent = data.missionTime;
    }

    // Update resources
    if (data.resources) {
        updateResourceCard("oxygenValue", data.resources.oxygen);
        updateResourceCard("waterValue", data.resources.water);
        updateResourceCard("foodValue", data.resources.food);
        updateResourceCard("powerValue", data.resources.power);
    }

    // Update radiation
    if (data.hazard) {
        const value = document.getElementById("radiationValue");
        const status = document.getElementById("radiationStatus");

        if (value) {
            value.textContent = data.hazard.radiationLevel + "%";
        }

        if (status) {
            status.textContent = data.hazard.status;
            status.classList.remove(
                "status-normal",
                "status-warning",
                "status-danger"
            );

            if (data.hazard.status === "DANGER") {
                status.classList.add("status-danger");
            } else if (data.hazard.status === "WARNING") {
                status.classList.add("status-warning");
            } else {
                status.classList.add("status-normal");
            }
        }
    }

});

// Update resource cards and their colours
function updateResourceCard(elementId, value) {

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
