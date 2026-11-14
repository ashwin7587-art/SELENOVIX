
// SELENOVIX - Lunar Mission Timer

let missionSeconds = 0;
let missionTimer = null;

function startMissionTimer() {

    if (missionTimer !== null) {
        return;
    }

    missionTimer = setInterval(function () {

        missionSeconds++;

        const hours = Math.floor(missionSeconds / 3600);
        const minutes = Math.floor((missionSeconds % 3600) / 60);
        const seconds = missionSeconds % 60;

        const display =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        const timerElement = document.getElementById("missionTimer");

        if (timerElement) {
            timerElement.textContent = display;
        }

    }, 1000);
}
