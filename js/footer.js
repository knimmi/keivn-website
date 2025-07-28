class Footer {
  constructor(placeholderId) {
    this.placeholderId = placeholderId;

    this.footerHTML = `
<footer class="footer">
  <div class="social-icons">
    <a href="#"><img src="../images/youtube.png" alt="YouTube"></a>
    <a href="#"><img src="../images/discord.png" alt="Discord"></a>
  </div>

  <div class="footer-links">
    <a href="#">Privacy Policy</a>
    <span>|</span>
    <a href="#">Terms of Service</a>
    <span>|</span>
    <a href="https://discord.gg/kevinbot">Contact Us on Discord</a>
  </div>

  <div class="copyright">
    &copy; 2025 Made By Sigma Knimmi.
  </div>
</footer>`;

    this.footerCSS = `
body {
  margin: 0;
  padding: 0;
  background-color: #0e0f11;
  font-family: Arial, sans-serif;
  color: white;
}

.footer {
  background-color: #0d0d0d;
  color: #aaa;
  text-align: center;
  padding: 20px 10px;
  font-size: 14px;
  border-top: 1px solid #2a2a2a;
}

.social-icons {
  margin-bottom: 15px;
}

.social-icons a {
  margin: 0 8px;
  display: inline-block;
}

.social-icons img {
  width: 20px;
  height: 20px;
  filter: brightness(0.7);
  transition: filter 0.3s;
}

.social-icons img:hover {
  filter: brightness(1);
}

.footer-links {
  margin-bottom: 10px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  margin: 0 5px;
}

.footer-links span {
  color: #555;
}

.footer-links a:hover {
   color: #6a8dff
}


.copyright {
  font-size: 14px;
  color: #aaa;
}`;
  }

  injectStyles() {
    if (!document.getElementById("footer-styles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "footer-styles";
      styleTag.innerHTML = this.footerCSS;
      document.head.appendChild(styleTag);
    }
  }

  render() {
    const placeholder = document.getElementById(this.placeholderId);
    if (!placeholder) {
      console.warn(
        `Footer placeholder with id '${this.placeholderId}' not found.`
      );
      return;
    }

    placeholder.innerHTML = this.footerHTML;
  }

  init() {
    this.injectStyles();
    this.render();
  }
}
