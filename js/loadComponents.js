async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();

    document.getElementById(id).innerHTML = html;
}

Promise.all([
    loadComponent("intro", "components/intro.html"),
    loadComponent("upcoming-events", "components/upcoming-events.html"),
    loadComponent("activities", "components/activities.html"),
    loadComponent("joined-companies", "components/joined-companies.html"),
    loadComponent("footer", "components/footer.html")
]).then(() => {

    // Load feature scripts AFTER HTML is loaded

    const logoScript = document.createElement("script");
    logoScript.src = "js/logoCarousel.js";
    document.body.appendChild(logoScript);

    const eventScript = document.createElement("script");
    eventScript.src = "js/upcomingEvents.js";
    document.body.appendChild(eventScript);

});