
// SELENOVIX - Resource Management System

const missionResources = {
    oxygen: 100,
    water: 100,
    food: 100,
    power: 100
};

// Reduce resources during the mission
function consumeResources() {

    missionResources.oxygen = Math.max(0, missionResources.oxygen - 5);
    missionResources.water = Math.max(0, missionResources.water - 4);
    missionResources.food = Math.max(0, missionResources.food - 3);
    missionResources.power = Math.max(0, missionResources.power - 6);

    console.log("Current Mission Resources:", missionResources);
}

// Automatically consume resources every 10 seconds
function startResourceConsumption() {

    setInterval(function () {

        missionResources.oxygen = Math.max(0, missionResources.oxygen - 1);
        missionResources.water = Math.max(0, missionResources.water - 1);
        missionResources.food = Math.max(0, missionResources.food - 1);
        missionResources.power = Math.max(0, missionResources.power - 2);

        updateResourceDashboard();

        console.log("Updated Mission Resources:", missionResources);

    }, 10000);
}

// Get current mission resources
function getMissionResources() {
    return missionResources;
}
