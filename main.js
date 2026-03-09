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

