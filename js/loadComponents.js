async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`Unable to load ${file} (${response.status})`);
    }

    element.innerHTML = await response.text();
}

Promise.all([
    loadComponent("header", "components/header.html"),
    loadComponent("intro", "components/intro.html"),
    loadComponent("upcoming-events", "components/upcoming-events.html"),
    loadComponent("joined-companies", "components/joined-companies.html"),
    loadComponent("footer", "components/footer.html")
]).then(() => {

    // Load feature scripts only after their HTML components are ready.
    const headerScript = document.createElement("script");
    headerScript.src = "js/headerNavigation.js";
    document.body.appendChild(headerScript);

    const logoScript = document.createElement("script");
    logoScript.src = "js/logoCarousel.js";
    document.body.appendChild(logoScript);

    const eventScript = document.createElement("script");
    eventScript.src = "js/upcomingEvents.js";
    document.body.appendChild(eventScript);

}).catch(error => {
    console.error("Failed to load homepage components:", error);
});
