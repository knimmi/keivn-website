document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
  <div class="navbar">
    <div class="logo">Kevin</div>
    <nav>
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/pages/about.html">About</a></li>
        <li><a href="/pages/commands.html">Commands</a></li>
        <li><a href="/pages/plans.html">Pricing</a></li>
        <li><a href="/pages/faq.html">FAQ</a></li>
      </ul>
    </nav>
    <div class="nav-buttons">
      <a href="#" class="donate-btn">Donate</a>
      <a href="https://discord.gg/kevinbot" class="premium-btn">Premium</a>
    </div>
  </div>
  `;

  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;

    const currentPath = window.location.pathname;

    document.querySelectorAll("nav a").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }
});
