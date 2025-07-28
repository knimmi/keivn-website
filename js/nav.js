class Navbar {
  /**
   * Creates an instance of Navbar.
   * @param {string} placeholderId - The ID of the container element where the navbar will be injected.
   * @param {object} options - Optional configuration object.
   * @param {Array} options.navLinks - Array of navigation link objects { href, text }.
   * @param {Array} options.navButtons - Array of button link objects { href, text, className }.
   * @param {string} options.logoText - Text to display as logo.
   */
  constructor(placeholderId, options = {}) {
    this.placeholderId = placeholderId;

    // Validate navLinks: use provided if non-empty array, else use default
    this.navLinks =
      Array.isArray(options.navLinks) && options.navLinks.length
        ? options.navLinks
        : [
            { href: "/index.html", text: "Home" },
            { href: "/pages/about.html", text: "About" },
            { href: "/pages/commands.html", text: "Commands" },
            { href: "/pages/plans.html", text: "Pricing" },
            { href: "/pages/faq.html", text: "FAQ" },
          ];

    // Validate navButtons: use provided if non-empty array, else use default
    this.navButtons =
      Array.isArray(options.navButtons) && options.navButtons.length
        ? options.navButtons
        : [
            { href: "#", text: "Donate", className: "donate-btn" },
            { href: "https://discord.gg/kevinbot", text: "Premium", className: "premium-btn" },
          ];

    // Logo text displayed in navbar
    this.logoText = options.logoText || "Kevin";

    // Bind event handlers once for add/remove event listeners later
    this._hamburgerClickHandler = this._toggleMenu.bind(this);
    this._hamburgerKeydownHandler = this._hamburgerKeydown.bind(this);

    // Cached DOM elements references (assigned after render)
    this.placeholder = null;
    this.hamburger = null;
    this.navMenu = null;
  }

  /**
   * Inject the navbar CSS stylesheet into the document head.
   * Prevents duplicate styles by checking if already injected.
   */
  injectStyles() {
    if (!document.getElementById("navbar-styles")) {
      const linkTag = document.createElement("link");
      linkTag.id = "navbar-styles";
      linkTag.rel = "stylesheet";
      linkTag.href = "../css/nav.css";
      document.head.appendChild(linkTag);
    }
  }

  /**
   * Generates the HTML string for navigation links.
   * @returns {string} HTML list items for navigation links.
   */
  generateNavLinks() {
    return this.navLinks
      .map(({ href, text }) => `<li><a href="${href}">${text}</a></li>`)
      .join("");
  }

  /**
   * Generates the HTML string for navigation buttons.
   * @returns {string} HTML anchor tags for nav buttons.
   */
  generateNavButtons() {
    return this.navButtons
      .map(({ href, text, className }) => `<a href="${href}" class="${className}">${text}</a>`)
      .join("");
  }

  /**
   * Renders the navbar inside the placeholder element.
   * - Warns if placeholder element does not exist.
   * - Cleans up previous event listeners and optionally content/styles before re-render.
   * - Injects HTML structure with logo, nav links, buttons, and hamburger toggle.
   * - Highlights current page link by matching location path.
   * - Attaches event listeners for hamburger toggle button.
   */
  render() {
    this.placeholder = document.getElementById(this.placeholderId);
    if (!this.placeholder) {
      console.warn(`Navbar placeholder with id '${this.placeholderId}' not found.`);
      return;
    }

    // Remove previous event listeners and optionally clear content/styles before rendering
    this.destroy(false);

    // Insert the navbar HTML into placeholder
    this.placeholder.innerHTML = `
      <div class="navbar">
        <div class="logo">${this.logoText}</div>
        <button
          class="hamburger"
          aria-label="Toggle navigation"
          aria-expanded="false"
          aria-controls="nav-menu"
          type="button"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        <nav id="nav-menu" class="nav-menu">
          <ul>${this.generateNavLinks()}</ul>
        </nav>
        <div class="nav-buttons">${this.generateNavButtons()}</div>
      </div>
    `;

    // Get current page path without trailing slash for comparison
    const currentPath = window.location.pathname.replace(/\/$/, "");

    // Highlight nav link corresponding to current page
    const navLinks = this.placeholder.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      try {
        const linkPath = new URL(link.href).pathname.replace(/\/$/, "");
        if (linkPath === currentPath) {
          link.classList.add("active");
        }
      } catch {
        // Skip invalid URLs silently
      }
    });

    // Cache references to hamburger button and nav menu elements
    this.hamburger = this.placeholder.querySelector(".hamburger");
    this.navMenu = this.placeholder.querySelector(".nav-menu");

    // Attach event listeners for hamburger toggle if elements are found
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", this._hamburgerClickHandler);
      this.hamburger.addEventListener("keydown", this._hamburgerKeydownHandler);
    }
  }

  /**
   * Toggles the hamburger menu open/closed.
   * Toggles CSS classes and updates ARIA attributes accordingly.
   */
  _toggleMenu() {
    const isActive = this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");
    this.hamburger.setAttribute("aria-expanded", isActive);
  }

  /**
   * Keyboard handler for hamburger button.
   * Opens or closes the menu when user presses Enter or Space keys.
   * @param {KeyboardEvent} event
   */
  _hamburgerKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._toggleMenu();
    }
  }

  /**
   * Destroys the navbar instance.
   * Removes attached event listeners to avoid leaks.
   * Optionally clears the placeholder's HTML content and removes styles.
   * @param {boolean} [fullCleanup=true] - If true, also clears placeholder content and removes stylesheet.
   */
  destroy(fullCleanup = true) {
    if (this.hamburger) {
      this.hamburger.removeEventListener("click", this._hamburgerClickHandler);
      this.hamburger.removeEventListener("keydown", this._hamburgerKeydownHandler);
    }
    if (fullCleanup) {
      if (this.placeholder) {
        this.placeholder.innerHTML = "";
      }
      const styleTag = document.getElementById("navbar-styles");
      if (styleTag) {
        styleTag.remove();
      }
    }
  }

  /**
   * Initializes the navbar by injecting styles and rendering it.
   */
  init() {
    this.injectStyles();
    this.render();
  }
}

export default Navbar;
