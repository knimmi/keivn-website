class Footer {
  /**
   * Create a Footer instance.
   * @param {string} placeholderId - The ID of the container element where footer will be injected.
   * @param {object} options - Optional configuration for links, styles, and copyright.
   */
  constructor(placeholderId, options = {}) {
    this.placeholderId = placeholderId;

    this.socialLinks = options.socialLinks || [
      { href: "https://www.youtube.com/@kevlnbot", imgSrc: "../images/youtube.png", alt: "YouTube" },
      { href: "https://discord.gg/kevinbot", imgSrc: "../images/discord.png", alt: "Discord" },
    ];

    this.footerLinks = options.footerLinks || [
      { href: "#", text: "Privacy Policy" },
      { href: "#", text: "Terms of Service" },
      { href: "https://discord.gg/kevinbot", text: "Contact Us on Discord" },
    ];

    this.cssPath = options.cssPath || "../css/footer.css";

    this.placeholder = null;
    this.styleInjected = false;

    this.copyright =
      options.copyright || "&copy; 2025 Made By Sigma Knimmi.";
  }

  /**
   * Inject stylesheet into document head if not already present.
   */
  injectStyles() {
    if (!document.getElementById("footer-styles")) {
      const linkTag = document.createElement("link");
      linkTag.id = "footer-styles";
      linkTag.rel = "stylesheet";
      linkTag.href = this.cssPath;
      document.head.appendChild(linkTag);
      this.styleInjected = true;
    }
  }

  /**
   * Remove injected stylesheet if it was added by this instance.
   */
  removeStyles() {
    if (this.styleInjected) {
      const styleTag = document.getElementById("footer-styles");
      if (styleTag) styleTag.remove();
      this.styleInjected = false;
    }
  }

  /**
   * Validate URLs to avoid broken links.
   * @param {string} url
   * @returns {boolean}
   */
  isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate HTML string for one social icon link.
   * @param {object} link
   * @returns {string}
   */
  createSocialIcon(link) {
    return `<a href="${link.href}" target="_blank" rel="noopener noreferrer"><img src="${link.imgSrc}" alt="${link.alt}"></a>`;
  }

  /**
   * Generate HTML string for all social icon links.
   * @returns {string}
   */
  generateSocialIcons() {
    return this.socialLinks
      .filter(({ href }) => this.isValidURL(href))
      .map(link => this.createSocialIcon(link))
      .join("");
  }

  /**
   * Generate HTML string for one footer text link.
   * @param {object} link
   * @returns {string}
   */
  createFooterLink(link) {
    const href = this.isValidURL(link.href) || link.href === "#" ? link.href : "#";
    return `<a href="${href}">${link.text}</a>`;
  }

  /**
   * Generate HTML string for all footer text links separated by '|'.
   * @returns {string}
   */
  generateFooterLinks() {
    return this.footerLinks
      .map((link, i) => `${this.createFooterLink(link)}${i < this.footerLinks.length - 1 ? '<span>|</span>' : ''}`)
      .join("");
  }

  /**
   * Generate complete footer HTML.
   * @returns {string}
   */
  generateFooterHTML() {
    return `
      <footer class="footer" role="contentinfo" aria-label="Footer">
        <div class="social-icons">${this.generateSocialIcons()}</div>
        <div class="footer-links">${this.generateFooterLinks()}</div>
        <div class="copyright">${this.copyright}</div>
      </footer>
    `;
  }

  /**
   * Render footer content inside placeholder.
   */
  render() {
    if (!this.placeholder) {
      console.warn(`Footer placeholder with id '${this.placeholderId}' not found.`);
      return;
    }
    this.placeholder.innerHTML = this.generateFooterHTML();
  }

  /**
   * Remove footer content and styles from DOM.
   */
  destroy() {
    if (this.placeholder) {
      this.placeholder.innerHTML = "";
    }
    this.removeStyles();
  }

  /**
   * Initialize footer by caching placeholder, injecting styles, and rendering content.
   */
  init() {
    this.placeholder = document.getElementById(this.placeholderId);
    if (!this.placeholder) {
      console.warn(`Footer placeholder with id '${this.placeholderId}' not found.`);
      return;
    }
    this.injectStyles();
    this.render();
  }
}

export default Footer;
