(function () {
  "use strict";

  // Play/pause videos only while visible, so dozens of clips on one
  // page don't all decode at once.
  var videos = document.querySelectorAll("video[data-autoplay]");
  if ("IntersectionObserver" in window && videos.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: "80px 0px", threshold: 0.15 }
    );
    videos.forEach(function (v) { io.observe(v); });
  }

  // "Show more" toggles for long result sections.
  document.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("data-toggle"));
      if (!panel) return;
      var open = panel.classList.toggle("open");
      btn.textContent = open ? btn.getAttribute("data-less") : btn.getAttribute("data-more");
      if (open) {
        panel.querySelectorAll("video[data-autoplay]").forEach(function (v) {
          if ("IntersectionObserver" in window) io.observe(v);
        });
      }
    });
  });

  // Copy BibTeX
  var copyBtn = document.querySelector(".copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = document.getElementById("bibtex-text").innerText;
      navigator.clipboard.writeText(text).then(function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = "Copied";
        setTimeout(function () { copyBtn.textContent = original; }, 1600);
      });
    });
  }
})();
