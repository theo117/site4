(function () {
  var doc = document;
  var root = doc.documentElement;

  root.classList.add("site-enhanced");

  function ready(fn) {
    if (doc.readyState === "loading") {
      doc.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    var app = doc.querySelector("#__nuxt .app, #app, .app");
    if (app) {
      app.style.opacity = "1";
      app.style.visibility = "visible";
      app.setAttribute("tabindex", "-1");
      app.setAttribute("id", app.id || "main-content");
    }

    if (!doc.querySelector(".site-skip-link") && app) {
      var skip = doc.createElement("a");
      skip.className = "site-skip-link";
      skip.href = "#" + app.id;
      skip.textContent = "Skip to content";
      doc.body.insertBefore(skip, doc.body.firstChild);
    }

    doc.querySelectorAll('a[href*="tel:+39 030 6857568.html"]').forEach(function (link) {
      link.href = "tel:+390306857568";
    });

    doc.querySelectorAll('button[aria-label="{{ $t(\'footer.submit\') }}"], button[aria-label^="{{"]').forEach(function (button) {
      button.setAttribute("aria-label", button.textContent.trim() || "Subscribe");
    });

    doc.querySelectorAll("img").forEach(function (img) {
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");

      var alt = (img.getAttribute("alt") || "").trim();
      if (!alt) {
        var label = img.closest("[aria-label]");
        var title = img.closest("a, section, article");
        var heading = title && title.querySelector("h1, h2, h3");
        var text = heading ? heading.textContent : label && label.getAttribute("aria-label");
        if (text) img.setAttribute("alt", text.replace(/\s+/g, " ").trim());
      }
    });

    doc.querySelectorAll('[style*="opacity: 0"][style*="visibility: hidden"]').forEach(function (el) {
      el.style.opacity = "1";
      el.style.visibility = "visible";
      if (el.style.transform && el.style.transform.indexOf("translate") !== -1) {
        el.style.transform = "none";
      }
    });

    doc.querySelectorAll('a[target="_blank"]').forEach(function (link) {
      var rel = (link.getAttribute("rel") || "").split(/\s+/);
      ["noopener", "noreferrer"].forEach(function (value) {
        if (rel.indexOf(value) === -1) rel.push(value);
      });
      link.setAttribute("rel", rel.filter(Boolean).join(" "));
    });
  });
})();
