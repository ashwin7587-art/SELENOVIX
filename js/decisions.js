
// SELENOVIX - Mission Decision Engine

const missionDecision = {
    score: 100,
    decisionsMade: 0,
    missionStatus: "ACTIVE"
};

// Solar Radiation Emergency Scenario
const solarScenario = {
    title: "SOLAR RADIATION EMERGENCY",

    description:
        "A sudden solar radiation warning has been detected near the lunar outpost. The crew must decide what to do.",

    choices: [
        {
            id: 1,
            title: "Enter Radiation Shelter",
            description: "Move the entire crew into the protected shelter.",
            scoreChange: 10,
            resourceChange: {
                power: -5
            },
            message:
                "Excellent decision! The crew moved into the radiation shelter."
        },
        {
            id: 2,
            title: "Continue Outdoor Mission",
            description: "Continue working outside despite the warning.",
            scoreChange: -25,
            resourceChange: {},
            message:
                "Dangerous decision! The crew remains exposed to a simulated radiation hazard."
        },
        {
            id: 3,
            title: "Stop Outdoor Operations",
            description: "Suspend outdoor activities and assess conditions.",
            scoreChange: 5,
            resourceChange: {
                power: -2
            },
            message:
                "Good decision! Outdoor activities have been suspended."
        }
    ]
};

// Process astronaut decision
function makeMissionDecision(choiceId) {

    const choice = solarScenario.choices.find(
        item => item.id === choiceId
    );

    if (!choice) {
        return null;
    }

    missionDecision.score = Math.max(
        0,
        Math.min(100, missionDecision.score + choice.scoreChange)
    );

    missionDecision.decisionsMade++;

    return {
        message: choice.message,
        score: missionDecision.score,
        decisionsMade: missionDecision.decisionsMade,
        resourceChange: choice.resourceChange
    };
}

// Get current mission score
function getMissionScore() {
    return missionDecision.score;
}

// Get scenario information
function getSolarScenario() {
    return solarScenario;
}

console.log("SELENOVIX Mission Decision Engine Initialized");
