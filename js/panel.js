document.addEventListener("DOMContentLoaded", () => {

    // Button machen
    const toggleButton = document.createElement("button");
    toggleButton.id = "nav-toggle";
    toggleButton.innerHTML = "☰";

    // Panel machen
    const panel = document.createElement("div");
    panel.id = "nav-panel";

    panel.innerHTML = `
        <h3>Navigation</h3>

        <a href="/public/inhaltsverzeichniss.php">🏠 Startseite</a>
        <a href="/public/memory.html">🃏 Memory</a>
        <a href="/public/statistik.html">📊 Statistik</a>
    `;

    // Elemente in Seite einfügen
    document.body.appendChild(toggleButton);
    document.body.appendChild(panel);

    // Menü öffnen/schließen
    toggleButton.addEventListener("click", () => {
        panel.classList.toggle("open");
    });

    // Aktive Seite markieren
    const links = panel.querySelectorAll("a");

    links.forEach(link => {

        const currentPath = window.location.pathname;
        const linkPath = new URL(link.href).pathname;

        if (currentPath === linkPath) {
            link.classList.add("aktiv");
        }
    });

    // Klick außerhalb schließt Panel
    document.addEventListener("click", (e) => {

        const clickImPanel = panel.contains(e.target);
        const clickAufButton = toggleButton.contains(e.target);

        if (!clickImPanel && !clickAufButton) {
            panel.classList.remove("open");
        }
    });

});