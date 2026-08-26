/*
 * Haverse Xchange Members
 *
 * DEMO DATA:
 * The entries below remain placeholders. Replace the names, descriptions,
 * logos and service categories with the approved member information.
 */

const members = [
    {
        name: "Demo Member Company 01",
        category: "marketing-branding",
        categoryLabel: "Marketing & Branding",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 1.jpg"
    },
    {
        name: "Demo Member Company 02",
        category: "financial-advisory",
        categoryLabel: "Financial Advisory",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 2.jpg"
    },
    {
        name: "Demo Member Company 03",
        category: "interior-architecture",
        categoryLabel: "Interior Design & Architecture",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 3.jpg"
    },
    {
        name: "Demo Member Company 04",
        category: "legal-advisory",
        categoryLabel: "Legal Advisory",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 4.jpg"
    },
    {
        name: "Demo Member Company 05",
        category: "culinary-consulting",
        categoryLabel: "Culinary Consulting",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 5.png"
    },
    {
        name: "Demo Member Company 06",
        category: "it-consulting",
        categoryLabel: "IT Consulting",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 6.jpg"
    },
    {
        name: "Demo Member Company 07",
        category: "business-retail",
        categoryLabel: "Business & Retail Management",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 7.png"
    },
    {
        name: "Demo Member Company 08",
        category: "business-licensing",
        categoryLabel: "Business Licensing",
        description: "Demo member profile. Replace this introduction with the company's approved profile description.",
        logo: "../images/consultant logo/company 8.jpg"
    }
];

const categoryTitles = {
    all: "All Members",
    "marketing-branding": "Marketing & Branding Members",
    "financial-advisory": "Financial Advisory Members",
    "interior-architecture": "Interior Design & Architecture Members",
    "legal-advisory": "Legal Advisory Members",
    "culinary-consulting": "Culinary Consulting Members",
    "it-consulting": "IT Consulting Members",
    "business-retail": "Business & Retail Management Members",
    "business-licensing": "Business Licensing Members",
    "hr-consulting": "HR Consulting Members"
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
