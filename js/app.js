
// SELENOVIX - Main Application

// Forward NASA data to the Decision Center
function sendNASADataToDecisionCenter() {

    const frame = document.getElementById("decisionFrame");

    if (
        frame &&
        frame.contentWindow &&
        window.selenovixNASAData
    ) {
        frame.contentWindow.postMessage(
            {
                type: "nasa-space-weather",
                data: window.selenovixNASAData
            },
            window.location.origin
        );
    }
}

// Listen for NASA data from nasa.js
window.addEventListener(
    "selenovix-nasa-data",
    sendNASADataToDecisionCenter
);


document.addEventListener("DOMContentLoaded", function () {

    const startButton = document.getElementById("startMission");

    if (!startButton) return;

    let missionStarted = false;

    // Create Emergency Center button
    const emergencyButton = document.createElement("button");

    emergencyButton.textContent = "🚨 Emergency Center";

    emergencyButton.style.cssText = `
        display: block;
        margin: 15px auto;
        padding: 12px 22px;
        background: #b82035;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    `;

    startButton.insertAdjacentElement("afterend", emergencyButton);

    // Create Decision Center button
    const decisionButton = document.createElement("button");

    decisionButton.textContent = "🧠 Decision Center";

    decisionButton.style.cssText = `
        display: block;
        margin: 15px auto;
        padding: 12px 22px;
        background: #1769aa;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    `;

    emergencyButton.insertAdjacentElement("afterend", decisionButton);


    // Open mission dashboard
    startButton.addEventListener("click", function () {

        if (missionStarted) {
            document.getElementById("dashboardOverlay").style.display = "flex";
            return;
        }

        missionStarted = true;

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


    // Open separate Emergency Center popup
    emergencyButton.addEventListener("click", function () {

        let overlay = document.getElementById("emergencyOverlay");

        if (overlay) {
            overlay.style.display = "flex";
            return;
        }

        overlay = document.createElement("div");
        overlay.id = "emergencyOverlay";

        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        const panel = document.createElement("div");

        panel.style.cssText = `
            width: 92%;
            max-width: 900px;
            height: 88vh;
            background: #071a35;
            border: 2px solid #ff4545;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
        `;

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

        const frame = document.createElement("iframe");
        frame.id = "emergencyFrame";
        frame.src = "emergency.html";

        frame.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
        `;

        panel.appendChild(closeButton);
        panel.appendChild(frame);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

    });


    // Open separate Decision Center popup
    decisionButton.addEventListener("click", function () {

        let overlay = document.getElementById("decisionOverlay");

        if (overlay) {
            overlay.style.display = "flex";

            // Send NASA data whenever the Decision Center is reopened
            sendNASADataToDecisionCenter();

            return;
        }

        overlay = document.createElement("div");
        overlay.id = "decisionOverlay";

        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.92);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
        `;

        const panel = document.createElement("div");

        panel.style.cssText = `
            width: 92%;
            max-width: 1000px;
            height: 90vh;
            background: #071a35;
            border: 2px solid #55c8ff;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
        `;

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

        const frame = document.createElement("iframe");

        frame.id = "decisionFrame";
        frame.src = "decisions.html";

        frame.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
        `;

        // Send NASA data after the Decision Center finishes loading
        frame.addEventListener("load", function () {
            sendNASADataToDecisionCenter();
        });

        panel.appendChild(closeButton);
        panel.appendChild(frame);

        overlay.appendChild(panel);

        document.body.appendChild(overlay);

    });

});


// Receive dashboard updates
window.addEventListener("message", function (event) {

    if (event.origin !== window.location.origin) return;

    const data = event.data;

    if (!data) return;

    // Close Emergency Center when requested
    if (data.type === "close-emergency") {

        const overlay = document.getElementById("emergencyOverlay");

        if (overlay) {
            overlay.style.display = "none";
        }

        return;
    }

    // Ignore NASA messages in the mission-update handler
    if (data.type !== "mission-update") return;

    // Update main page mission timer
    const timer = document.getElementById("missionTimer");

    if (timer && data.missionTime) {
        timer.textContent = data.missionTime;
    }

    // Update main page resources
    if (data.resources) {
        updateResourceCard("oxygenValue", data.resources.oxygen);
        updateResourceCard("waterValue", data.resources.water);
        updateResourceCard("foodValue", data.resources.food);
        updateResourceCard("powerValue", data.resources.power);
    }

    // Update main page radiation
    if (data.hazard) {

        const value = document.getElementById("radiationValue");
        const status = document.getElementById("radiationStatus");

        if (value) {
            value.textContent = data.hazard.radiationLevel + "%";
        }

        if (status) {
            updateStatusElement(status, data.hazard.status);
        }
    }

    // Forward mission data to Emergency Center
    const emergencyFrame = document.getElementById("emergencyFrame");

    if (emergencyFrame && emergencyFrame.contentWindow) {
        emergencyFrame.contentWindow.postMessage(
            data,
            window.location.origin
        );
    }

});


// Update resource cards and their colours
function updateResourceCard(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) return;

    element.textContent = value + "%";

    if (value >= 70) {
        updateStatusElement(element, "Normal");
    } else if (value > 30) {
        updateStatusElement(element, "WARNING");
    } else {
        updateStatusElement(element, "DANGER");
    }
}


// Update status colours
function updateStatusElement(element, status) {

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
