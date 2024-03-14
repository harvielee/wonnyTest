/* const { ScrollTrigger } = require("gsap/all"); */

const cursor = document.querySelector("#cursor");
const cursorCircle = cursor.querySelector(".cursor__circle");

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener("mousemove", updateCoordinates);

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
  const rotate = "rotate(" + angle + "deg)";
  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll("[cursor-class]");

cursorModifiers.forEach((curosrModifier) => {
  curosrModifier.addEventListener("mouseenter", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.add(className);
  });

  curosrModifier.addEventListener("mouseleave", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.remove(className);
  });
});

let mm = gsap.matchMedia();

const box1 = document.querySelectorAll(".itemL");

mm.add("(min-width: 992px)", () => {
  gsap.to(box1, {
    duration: 2,
    y: -500,
    scrollTrigger: {
      trigger: box1,
      start: "top 55%",
      end: "+=2000",
      scrub: true,
      markers: false,
    },
  });
});

/* Page transition */

gsap.to(".bar", {  
  /* clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)", */
  clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
  duration: .8,
  stagger: .2,
  ease: "power4.inOut",
});
gsap.to(".bar", {
  delay: 1.6,
  /* clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", */
  clipPath: "polygon(100% 0%, 0% 0%, 0% 0%, 100% 0%)",
  duration: .6,
  stagger: .2,
  ease: "power4.inOut",
});
gsap.to("nav", {
  top: 0,
  ease: "power3.inOut",
  duration: 0.5,
  delay: 3,
});
const ani3 = gsap.timeline();
ani3.from("#w-node-a5 .w__item", {
  delay: 3.2,
  duration: 1.2,
  autoAlpha: 0,
  y: 400,
  ease: "power4.inOut",
  // stagger: 0.1
  stagger: {
    amount: 2,
    from: "left",
  },
});

let textWrapper = document.querySelector(".ml12");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

gsap.timeline().from(".ml12 .letter", {
  autoAlpha: 0,
  duration: 0.75,
  yPercent: -100,
  delay: 3,
  stagger: {
    amount: 0.5,
    grid: "auto",
    from: "random",
  },
  ease: "power2.out",
});
gsap.fromTo(".loader-logo", {
  autoAlpha: 1, 
},
{
  autoAlpha:0,
  delay: 2,
  ease: "power3.inOut",
  duration: .1,
});

setTimeout(function () {
  const div = document.querySelector(".loader");

  div.remove();
}, 4000);



const hero = gsap.timeline();
hero.to(".ml12", { autoAlpha: 0, duration: 1, scale: 0.7 });

ScrollTrigger.create({
  animation: hero,
  trigger: ".hero",
  start: "top 20%",
  end: "+=600",
  stagger: {
    amount: 0.5,
    grid: "auto",
    from: "random",
  },
  scrub: true,
  markers: false,
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".burger");
  let isOpen = false;
  gsap.set(".menu-item", { yPercent: 50, autoAlpha: 0 });
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(
    ".navMenu .nav-bg",
    {
      autoAlpha: 0,
      duration: .1,
      ease: "power4.out",
    },
    {
      autoAlpha: .3,
    })
    .add("start")
    .to(".overlay", {
      duration: .6,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
    })

    .to(".logo", {autoAlpha: 0, duration: .5},"start")

    .to(".logo-w", {autoAlpha: 1, duration: .5})

    .to(".overlay .menu-item",
      { duration: .5,
        yPercent: 0,
        stagger: .2,
        delay: .5,
        autoAlpha: 1,
        ease: "power4.out",
      }, "-=1")

    .fromTo(".overlay .sub-nav",
      { yPercent: 100 },
      { yPercent: 0,
        autoAlpha: 1,
        duration: .5,
      }, "<");

  toggleButton.addEventListener("click", function () {
    if (isOpen) {
      tl.reverse();
    } else {
      tl.play();
    }
    isOpen = !isOpen;
  });
});

/* progress bar */

window.onload = function () {
  const container = document.querySelector(".prg-container");
  const svg = document.querySelector(".prg-item");
  const progress = document.querySelector(".indicator");
  const totalLength = progress.getTotalLength();

  const progressBarDisplay = function () {
    window.scrollY > window.innerHeight - 800
      ? svg.classList.add("show")
      : svg.classList.remove("show");
  };
  window.addEventListener("scroll", progressBarDisplay);

  const scrollWindow = function () {
    if (window.scrollY != 0) {
      setTimeout(function () {
        window.scrollTo(0, window.scrollY - 50);
        scrollWindow();
      }, 10);
    }
  };

  setTimeout(function () {
    scrollTo(0, 0);
  }, 100);

  setTopValue(svg);

  progress.style.strokeDasharray = totalLength;
  progress.style.strokeDashoffset = totalLength;

  window.addEventListener("scroll", () => {
    setProgress(container, progress, totalLength);
  });

  window.addEventListener("resize", () => {
    setTopValue(svg);
  });
};

function setTopValue(svg) {
  svg.style.top =
    document.documentElement.clientHeight * 0.5 -
    svg.getBoundingClientRect().height * 0.5 +
    "px";
}

function setProgress(container, progress, totalLength) {
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;

  const percentage = scrollTop / (scrollHeight - clientHeight);

  progress.style.strokeDashoffset = totalLength - totalLength * percentage;
}

/* Back to top button */

const scrollTop = function () {
  const scrollBtn = document.querySelector(".prg-container");
  const scrollBtnDisplay = function () {
    window.scrollY > window.innerHeight
      ? scrollBtn.classList.add("show")
      : scrollBtn.classList.remove("show");
  };
  window.addEventListener("scroll", scrollBtnDisplay);

  const scrollWindow = function () {
    if (window.scrollY != 0) {
      setTimeout(function () {
        window.scrollTo(0, window.scrollY - 50);
        scrollWindow();
      }, 10);
    }
  };
  scrollBtn.addEventListener("click", scrollWindow);
};
scrollTop();

/* change position */

function chgBtn() {
  const footer = document.querySelector("#footer");
  const container = document.querySelector(".prg-container");
  var windowHeight = window.innerHeight;
  var footerHeight = footer.getBoundingClientRect().top;

  if (footerHeight < windowHeight) {
    container.classList.add("on");
  } else {
    container.classList.remove("on");
  }
}
window.addEventListener("scroll", chgBtn);

const showNav = gsap
  .from("nav", {
    yPercent: -200,
    paused: true,
    duration: 0.2,
  })
  .progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showNav.play() : showNav.reverse();
  },
});


