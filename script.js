/* ============================================================
   script.js — Portfolio: Michael Henry
   Handles:
     1. Typing animation in the hero section
     2. Scroll reveal animations
     3. Mobile hamburger menu
     4. Active nav link highlighting on scroll
   ============================================================ */


/* ============================================================
   1. TYPING ANIMATION
   Cycles through an array of job titles, typing and deleting
   each one character by character.
   ============================================================ */

const titles = [
  "SOC Analyst",
  "Data Analyst",
  "Python Developer",
  "Threat Intelligence Enthusiast",
  "Cybersecurity Researcher"
];

let titleIndex = 0;   // which title we are currently typing
let charIndex  = 0;   // which character we are up to in that title
let isDeleting = false; // whether we are currently deleting characters

const typedEl = document.getElementById("typed-text");

function type() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    // Remove one character
    typedEl.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add one character
    typedEl.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  // Decide what to do next and how long to wait
  let delay = isDeleting ? 60 : 100; // delete faster than type

  if (!isDeleting && charIndex === currentTitle.length) {
    // Finished typing — pause before starting to delete
    delay = 2000;
    isDeleting = true;

  } else if (isDeleting && charIndex === 0) {
    // Finished deleting — move to the next title
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

// Start the typing animation once the page has loaded
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 600);
});


/* ============================================================
   2. SCROLL REVEAL ANIMATIONS
   Uses IntersectionObserver to detect when .reveal elements
   enter the viewport, then adds the .visible class which
   triggers the CSS fade-in + slide-up transition.
   ============================================================ */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Stop observing once visible — no need to re-trigger
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,   // trigger when 12% of the element is visible
    rootMargin: "0px"
  }
);

// Observe every element that has the .reveal class
document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});


/* ============================================================
   3. MOBILE HAMBURGER MENU
   Toggles the .open class on the nav links list, which the
   CSS uses to show/hide the mobile menu.
   ============================================================ */

const hamburger = document.querySelector(".hamburger");
const navLinks  = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  // Animate the hamburger bars into an X when open
  const bars = hamburger.querySelectorAll("span");
  if (navLinks.classList.contains("open")) {
    bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    bars[1].style.opacity   = "0";
    bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    bars[0].style.transform = "";
    bars[1].style.opacity   = "";
    bars[2].style.transform = "";
  }
});

// Close the mobile menu when any nav link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const bars = hamburger.querySelectorAll("span");
    bars[0].style.transform = "";
    bars[1].style.opacity   = "";
    bars[2].style.transform = "";
  });
});


/* ============================================================
   4. ACTIVE NAV LINK ON SCROLL
   Highlights the nav link whose section is currently in view.
   ============================================================ */

const sections  = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active style from all links
        navAnchors.forEach((a) => a.style.color = "");

        // Highlight the link that matches the visible section
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.style.color = "var(--accent-primary)";
      }
    });
  },
  { threshold: 0.4 } // section must be 40% visible to count as active
);

sections.forEach((s) => sectionObserver.observe(s));
