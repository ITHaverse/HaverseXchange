async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    const response = await fetch(file);
    if (!response.ok) throw new Error(`Unable to load ${file}`);

    element.innerHTML = await response.text();
}

Promise.all([
    loadComponent("header", "components/header.html"),
    loadComponent("footer", "components/footer.html")
]).then(() => {
    const headerScript = document.createElement("script");
    headerScript.src = "js/headerNavigation.js";
    document.body.appendChild(headerScript);
}).catch(error => console.error("Failed to load landing page components:", error));
