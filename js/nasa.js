
// SELENOVIX - NASA Space Weather and CRaTER Integration

const NASA_BASE_URL = "https://ccmc.gsfc.nasa.gov/DONKI-API/get";

const CRATER_DATA_URL =
    "https://pds.nasa.gov/ds-view/pds/viewDataset.jsp?dsid=LRO-L-CRAT-3-CDR-CALIBRATED-V1.0";

// Shared NASA data
window.selenovixNASAData = null;

function formatEventDate(dateString) {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleString();
}

// Display NASA event information
function createEventList(title, events, type) {
    const section = document.createElement("div");

    section.style.marginTop = "20px";
    section.style.textAlign = "left";

    const heading = document.createElement("h3");
    heading.textContent = title;

    section.appendChild(heading);

    if (!events || events.length === 0) {
        const message = document.createElement("p");

        message.textContent =
            "No events reported in this period.";

        section.appendChild(message);

        return section;
    }

    events.slice(-5).reverse().forEach((event) => {
        const item = document.createElement("div");

        item.style.padding = "12px";
        item.style.marginBottom = "10px";
        item.style.border = "1px solid #258bce";
        item.style.borderRadius = "8px";
        item.style.background = "rgba(10, 25, 50, 0.6)";

        const name = document.createElement("strong");
        const details = document.createElement("p");

        if (type === "FLR") {
            name.textContent =
                "Solar Flare: " +
                (event.classType || "Classification unavailable");

            details.textContent =
                "Start: " + formatEventDate(event.beginTime) +
                " | Peak: " + formatEventDate(event.peakTime) +
                " | Location: " + (event.sourceLocation || "Unknown");

        } else {
            name.textContent = "Coronal Mass Ejection";

            const analysis =
                event.cmeAnalyses && event.cmeAnalyses.length > 0
                    ? event.cmeAnalyses[0]
                    : null;

            const speed =
                analysis && analysis.speed != null
                    ? analysis.speed + " km/s"
                    : "Not available";

            const cmeType =
                analysis && analysis.type
                    ? analysis.type
                    : "Not available";

            details.textContent =
                "Start: " + formatEventDate(event.startTime) +
                " | Speed: " + speed +
                " | Type: " + cmeType;
        }

        item.appendChild(name);
        item.appendChild(details);

        section.appendChild(item);
    });

    return section;
}

// NASA CRaTER historical lunar radiation research
function createCRaTERPanel() {
    const section = document.createElement("div");

    section.id = "nasaCRaTERPanel";
    section.style.marginTop = "25px";
    section.style.padding = "16px";
    section.style.border = "1px solid #258bce";
    section.style.borderRadius = "10px";
    section.style.background = "rgba(10, 25, 50, 0.7)";
    section.style.textAlign = "left";

    const heading = document.createElement("h3");

    heading.textContent =
        "🌙 NASA CRaTER Lunar Radiation Research";

    const description = document.createElement("p");

    description.textContent =
        "NASA's Lunar Reconnaissance Orbiter carries the " +
        "Cosmic Ray Telescope for the Effects of Radiation (CRaTER). " +
        "Its archive contains calibrated particle-energy measurements " +
        "and instrument data used to study the lunar radiation environment.";

    const dataType = document.createElement("p");

    dataType.textContent =
        "Data type: Historical NASA lunar-orbit research data.";

    const limitation = document.createElement("p");

    limitation.textContent =
        "Important: These measurements are not a live radiation reading " +
        "at the lunar South Pole and are not a direct astronaut dose estimate.";

    limitation.style.color = "#ffcc80";

    const link = document.createElement("a");

    link.href = CRATER_DATA_URL;
    link.textContent = "Open official NASA CRaTER dataset ↗";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.color = "#65c8ff";
    link.style.fontWeight = "bold";

    section.appendChild(heading);
    section.appendChild(description);
    section.appendChild(dataType);
    section.appendChild(limitation);
    section.appendChild(link);

    return section;
}

// Send NASA data to the main application and Decision Center
function shareNASAData(nasaData) {

    window.selenovixNASAData = nasaData;

    window.dispatchEvent(
        new CustomEvent("selenovix-nasa-data", {
            detail: nasaData
        })
    );

    console.log(
        "NASA data shared with SELENOVIX:",
        nasaData
    );
}

// Fetch NASA space-weather observations
async function fetchNASASpaceWeather() {

    const endDate = new Date();
    const startDate = new Date();

    startDate.setDate(endDate.getDate() - 7);

    const formatDate = (date) =>
        date.toISOString().split("T")[0];

    const start = formatDate(startDate);
    const end = formatDate(endDate);

    const flareElement =
        document.getElementById("nasaFlareCount");

    const cmeElement =
        document.getElementById("nasaCMECount");

    const updatedElement =
        document.getElementById("nasaLastUpdated");

    const statusElement =
        document.getElementById("nasaWeatherStatus");

    const panel =
        document.getElementById("nasaWeatherPanel");

    try {

        const [flareResponse, cmeResponse] =
            await Promise.all([
                fetch(
                    `${NASA_BASE_URL}/FLR?startDate=${start}&endDate=${end}`
                ),
                fetch(
                    `${NASA_BASE_URL}/CME?startDate=${start}&endDate=${end}`
                )
            ]);

        if (!flareResponse.ok || !cmeResponse.ok) {
            throw new Error("NASA API request failed.");
        }

        const solarFlares = await flareResponse.json();

        const coronalMassEjections =
            await cmeResponse.json();

        // Update dashboard event counts
        if (flareElement) {
            flareElement.textContent = solarFlares.length;
        }

        if (cmeElement) {
            cmeElement.textContent =
                coronalMassEjections.length;
        }

        if (updatedElement) {
            updatedElement.textContent =
                new Date().toLocaleString();
        }

        if (statusElement) {
            statusElement.textContent =
                "NASA space-weather data loaded successfully!";

            statusElement.className = "status-normal";
        }

        // Display NASA event details
        if (panel) {

            const oldDetails =
                document.getElementById("nasaEventDetails");

            if (oldDetails) {
                oldDetails.remove();
            }

            const detailsContainer =
                document.createElement("div");

            detailsContainer.id = "nasaEventDetails";

            const detailsHeading =
                document.createElement("h3");

            detailsHeading.textContent =
                "🔭 Individual NASA Event Details";

            detailsContainer.appendChild(detailsHeading);

            detailsContainer.appendChild(
                createEventList(
                    "☀️ Latest Solar Flares",
                    solarFlares,
                    "FLR"
                )
            );

            detailsContainer.appendChild(
                createEventList(
                    "🌌 Latest Coronal Mass Ejections",
                    coronalMassEjections,
                    "CME"
                )
            );

            panel.appendChild(detailsContainer);

            // Display CRaTER research information
            const oldCRaTER =
                document.getElementById("nasaCRaTERPanel");

            if (oldCRaTER) {
                oldCRaTER.remove();
            }

            panel.appendChild(createCRaTERPanel());
        }

        // Prepare NASA data for other SELENOVIX modules
        const nasaData = {

            source: "NASA CCMC DONKI",

            dataType: "Real NASA space-weather observations",

            lastUpdated: new Date().toISOString(),

            solarFlares: solarFlares,

            coronalMassEjections: coronalMassEjections,

            craterResearchSource: CRATER_DATA_URL

        };

        // Share NASA data with the application
        shareNASAData(nasaData);

        console.log(
            "NASA Space Weather and CRaTER Sources:",
            nasaData
        );

        return nasaData;

    } catch (error) {

        console.error(
            "NASA Data Integration Error:",
            error
        );

        if (statusElement) {
            statusElement.textContent =
                "Unable to retrieve NASA data. Please try again.";

            statusElement.className = "status-danger";
        }

        // Keep CRaTER research information available
        if (
            panel &&
            !document.getElementById("nasaCRaTERPanel")
        ) {
            panel.appendChild(createCRaTERPanel());
        }

        return null;
    }
}

console.log(
    "SELENOVIX NASA Integration Initialized"
);

// Start NASA data retrieval
fetchNASASpaceWeather();
