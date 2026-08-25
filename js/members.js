/*
 * Haverse Xchange Members
 *
 * DEMO DATA:
 * The entries below are placeholders used to demonstrate the member
 * directory and category filtering. Replace the names/descriptions/images
 * with the actual member information when it is available.
 */

const members = [
    {
        name: "Demo Member Company 01",
        category: "fb",
        categoryLabel: "F&B",
        description: "A member business operating within the food and beverage sector. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 1.jpg"
    },
    {
        name: "Demo Member Company 02",
        category: "fb",
        categoryLabel: "F&B",
        description: "A member business serving customers through food, beverage and hospitality-related services. Replace this text with the company's approved introduction.",
        logo: "../images/consultant logo/company 2.jpg"
    },
    {
        name: "Demo Member Company 03",
        category: "retail",
        categoryLabel: "Retail & E-commerce",
        description: "A member business operating in retail and e-commerce. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 3.jpg"
    },
    {
        name: "Demo Member Company 04",
        category: "entertainment",
        categoryLabel: "Entertainment & Recreation",
        description: "A member business within entertainment and recreation. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 4.jpg"
    },
    {
        name: "Demo Member Company 05",
        category: "real-estate",
        categoryLabel: "Real Estate",
        description: "A member business connected to the real estate ecosystem. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 5.png"
    },
    {
        name: "Demo Member Company 06",
        category: "real-estate",
        categoryLabel: "Real Estate",
        description: "A member business operating in the property and real estate sector. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 6.jpg"
    },
    {
        name: "Demo Member Company 07",
        category: "finance",
        categoryLabel: "Finance & Banking",
        description: "A member business operating within finance and banking. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 7.png"
    },
    {
        name: "Demo Member Company 08",
        category: "professional-services",
        categoryLabel: "Professional Services",
        description: "A member business providing professional services to the wider business ecosystem. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 8.jpg"
    }
];

const categoryTitles = {
    all: "All Members",
    fb: "F&B Members",
    retail: "Retail & E-commerce Members",
    entertainment: "Entertainment & Recreation Members",
    "real-estate": "Real Estate Members",
    finance: "Finance & Banking Members",
    "professional-services": "Professional Services Members"
};

function renderMembers(category = "all") {
    const list = document.getElementById("member-list");
    const empty = document.getElementById("member-empty");
    const title = document.getElementById("member-category-title");
    const count = document.getElementById("member-count");

    if (!list || !empty || !title || !count) return;

    const filteredMembers = category === "all"
        ? members
        : members.filter(member => member.category === category);

    title.textContent = categoryTitles[category] || "Members";
    count.textContent = `${filteredMembers.length} ${filteredMembers.length === 1 ? "member" : "members"}`;

    list.innerHTML = "";

    if (!filteredMembers.length) {
        empty.hidden = false;
        return;
    }

    empty.hidden = true;

    filteredMembers.forEach(member => {
        const article = document.createElement("article");
        article.className = "member-card";

        article.innerHTML = `
            <div class="member-card-content">
                <span class="member-card-category">${member.categoryLabel}</span>
                <h4>${member.name}</h4>
                <p>${member.description}</p>
            </div>

            <div class="member-logo-wrap">
                <img src="${member.logo}" alt="${member.name} logo" loading="lazy">
            </div>
        `;

        list.appendChild(article);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll(".member-filter");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            const category = filter.dataset.category;

            filters.forEach(button => {
                const isActive = button === filter;
                button.classList.toggle("active", isActive);
                button.setAttribute("aria-selected", String(isActive));
            });

            renderMembers(category);
        });
    });

    renderMembers("all");
});
