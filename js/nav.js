document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
  <div class="navbar">
    <div class="logo">Kevin</div>
    <nav>
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/pages/about.html">About</a></li>
        <li><a href="/pages/commands.html">Commands</a></li>
        <li><a href="/index.html">Team</a></li>
        <li><a href="/pages/faq.html">FAQ</a></li>
      </ul>
    </nav>
    <div class="nav-buttons">
      <a href="#" class="donate-btn">Donate</a>
      <a href="#" class="premium-btn">Premium</a>
    </div>
  </div>
`;

  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  }
});
