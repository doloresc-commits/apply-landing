// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Testimonial carousel
const testimonials = Array.from(
  document.querySelectorAll(".testimonial-carousel .testimonial")
);
const prevBtn = document.querySelector(".carousel-control.prev");
const nextBtn = document.querySelector(".carousel-control.next");

let currentIndex = 0;
let autoPlayTimer = null;

function showTestimonial(index) {
  if (!testimonials.length) return;

  testimonials.forEach((item, i) => {
    item.classList.toggle("is-active", i === index);
  });

  currentIndex = index;
}

function nextTestimonial() {
  const nextIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(nextIndex);
}

function prevTestimonialHandler() {
  const prevIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex);
}

function resetAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
  }
  autoPlayTimer = setInterval(nextTestimonial, 7000);
}

if (testimonials.length) {
  resetAutoPlay();

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextTestimonial();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevTestimonialHandler();
      resetAutoPlay();
    });
  }
}

// Members logo track: all 67 logos, slow autoplay + drag
const MEMBER_LOGOS = [
  "Adrienna Arsht Center_White.png",
  "BAM.png",
  "Broward_white.png",
  "Capa_White.png",
  "Denver Center_white.png",
  "Dr Phillips Center_White.png",
  "Fox_white.png",
  "Hult.png",
  "Kauffman_White.png",
  "Kentucky_White.png",
  "Marcus_White.png",
  "Mesa.png",
  "NJPAC.png",
  "Ordway_White.png",
  "Overture_White.png",
  "Playhouse_White.png",
  "Seattle.png",
  "Segerstorm_White.png",
  "Straz .png",
  "Straz Center_White.png",
  "Tobin.png",
  "Walton.png",
  "adrienne.png",
  "apollo.png",
  "arts commons.png",
  "at&T.png",
  "at_t White.png",
  "bass hall.png",
  "blumenthal.png",
  "boch.png",
  "broward.png",
  "burbank.png",
  "bushnell.png",
  "capa.png",
  "cincinnati.png",
  "dayton.png",
  "denver.png",
  "dpc.png",
  "fox cities .png",
  "fox.png",
  "kaufman.png",
  "kennedy.png",
  "kentucky.png",
  "kimmel.png",
  "kravis.png",
  "lincoln.png",
  "marcus.png",
  "midland.png",
  "music center.png",
  "national.png",
  "njpac(1).png",
  "nyc center.png",
  "omaha.png",
  "overture.png",
  "peace.png",
  "phillips.png",
  "pittsburgh.png",
  "place de .png",
  "playhouse.png",
  "portland.png",
  "proctor.png",
  "san diego.png",
  "stg.png",
  "stnj.png",
  "tennessee.png",
  "vancouver.png",
  "woodruff.png",
];

function buildLogoTrack() {
  const track = document.getElementById("logo-track");
  const slider = document.getElementById("members");
  if (!track || !slider || !MEMBER_LOGOS.length) return;

  const frag = document.createDocumentFragment();
  function appendSet() {
    MEMBER_LOGOS.forEach((name) => {
      const item = document.createElement("div");
      item.className = "logo-item";
      const img = document.createElement("img");
      img.src = "images/" + encodeURI(name);
      img.alt = name.replace(/\.png$/i, "").replace(/_/g, " ");
      img.draggable = false;
      img.addEventListener("dragstart", (e) => e.preventDefault());
      item.appendChild(img);
      frag.appendChild(item);
    });
  }
  appendSet();
  appendSet();
  track.appendChild(frag);

  let x = 0;
  let dragging = false;
  let startX = 0;
  let startTranslate = 0;
  let rafId = null;
  /** ~18 px/s at 60fps — slower than previous CSS marquee */
  const speed = 0.3;

  function halfWidth() {
    return track.scrollWidth / 2;
  }

  function normalize() {
    const w = halfWidth();
    if (!w) return;
    while (x <= -w) x += w;
    while (x > 0) x -= w;
  }

  function frame() {
    if (!dragging) {
      x -= speed;
      const w = halfWidth();
      if (w && x <= -w) x += w;
    }
    track.style.transform = "translateX(" + x + "px)";
    rafId = requestAnimationFrame(frame);
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reduceMotion) {
    rafId = requestAnimationFrame(frame);
  } else {
    track.style.transform = "translateX(0)";
  }

  slider.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragging = true;
    startX = e.clientX;
    startTranslate = x;
    try {
      slider.setPointerCapture(e.pointerId);
    } catch (_) {}
    slider.classList.add("is-dragging");
  });

  slider.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    x = startTranslate + (e.clientX - startX);
    normalize();
    track.style.transform = "translateX(" + x + "px)";
  });

  function endDrag() {
    dragging = false;
    slider.classList.remove("is-dragging");
    normalize();
  }

  slider.addEventListener("pointerup", endDrag);
  slider.addEventListener("pointercancel", endDrag);
  slider.addEventListener("lostpointercapture", endDrag);
}

buildLogoTrack();
