function normalizeLocalComponentPaths(container) {
    container.querySelectorAll('[src], [href]').forEach((el) => {
        const attr = el.hasAttribute('src') ? 'src' : 'href';
        const value = el.getAttribute(attr);
        if (!value) return;

        if (
            value.startsWith('#') ||
            value.startsWith('../') ||
            value.startsWith('/') ||
            value.startsWith('http://') ||
            value.startsWith('https://') ||
            value.startsWith('//') ||
            value.startsWith('mailto:') ||
            value.startsWith('tel:') ||
            value.startsWith('data:') ||
            value.startsWith('javascript:')
        ) return;

        el.setAttribute(attr, `../${value}`);
    });
}

async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    const response = await fetch(file);
    if (!response.ok) throw new Error(`Unable to load ${file}`);

    const html = await response.text();
    element.innerHTML = html;
    normalizeLocalComponentPaths(element);
}

loadComponent("header", "../components/header.html")
    .then(() => {
        const headerScript = document.createElement("script");
        headerScript.src = "../js/headerNavigation.js";
        document.body.appendChild(headerScript);
    })
    .catch(error => console.error("Failed to load header:", error));

