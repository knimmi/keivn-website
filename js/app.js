import Navbar from "./nav.js";
import Footer from "./footer.js";

// Initialize web components
function initComponents() {
  new Navbar("navbar-placeholder").init();
  new Footer("footer-placeholder").init();
}

// Register service worker with error handling
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((error) => console.error("Service Worker registration failed:", error));
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initComponents();
  registerServiceWorker();
});
