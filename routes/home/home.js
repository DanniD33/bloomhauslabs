console.log("JS LOADED");

// LOADING SCREEN

const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('progress-counter');
const loadingScreen = document.getElementById('loading-screen');
const heroSection = document.querySelector('.hero');



console.log(gsap);
console.log(ScrollTrigger);
console.log(ScrollToPlugin);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let scene;
let camera;
let renderer;





function initThree() {
 console.log(
    "canvas:",
    document.querySelector("#portal-canvas")
  );

  if (!window.THREE) {
    console.error("THREE not loaded yet");
    return;
  }

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  console.log("camera created:", camera);

  camera.position.z = 400;

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#portal-canvas"),
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
}








function updateProgress(progress) {
  progressBar.style.width = `${progress}%`;
  counter.textContent = `${progress}%`;
}

updateProgress(0);
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', () => {
  let progress = 0;
  const increment = 5;

  const updateLoop = setInterval(() => {
    if (progress >= 100) {
      clearInterval(updateLoop);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.height = '0';
        heroSection.style.opacity = '1';
        setTimeout(() => {
          window.addEventListener('wheel', handleScroll, { passive: false });
          document.body.style.overflowY = 'scroll';
        }, 700);
      }, 0);
    }
    updateProgress(progress);
    progress += increment;
  }, 100);
});





// SITENAME ABSOLUTE POSITIONING TO RELATIVE POSITIONING

window.addEventListener('scroll', () => {
  const part1 = document.querySelector('.part1');
  const sitename = document.querySelector('.sitename');
  const spacer = document.querySelector('.spacer');

  const part1Top = part1.getBoundingClientRect().top;
  const sitenameHeight = sitename.offsetHeight;

  const scrollThreshold = part1.offsetTop - sitenameHeight;

  if (part1Top <= 0) {
    sitename.classList.add('relative');
    spacer.classList.add('absolute');
  } else {
    sitename.classList.remove('relative');
    spacer.classList.remove('absolute');
  }
});






// HUGE TEXTS TRANSITIONING UPWARDS

window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.fadein');
  elements.forEach((element) => {
    if (isElementInMiddleViewport(element)) {
      element.style.opacity = '1';
      element.classList.add('move-up');
    }
  });
});

function isElementInMiddleViewport(element) {
  const rect = element.getBoundingClientRect();
  const elementMiddle = rect.top + rect.height / 2;
  return elementMiddle >= 0 && elementMiddle <= window.innerHeight;
}






// GSAP SMOOTH SCROLLING


function handleScroll(event) {
  event.preventDefault();

  const deltaY = event.deltaY;
  const deltaX = event.deltaX;

  if (deltaY !== 0) {
    const scrollAmount = deltaY * 5;

    gsap.to(window, {
      scrollTo: {
        y: '+=' + scrollAmount,
        autoKill: false
      },
      duration: 1,
      ease: 'power2.out'
    });
  }
}



function waitForThree(callback) {
  if (window.THREE) {
    callback();
  } else {
    requestAnimationFrame(() => waitForThree(callback));
  }
}

// GSAP HORIZONTAL SCROLL

window.addEventListener("load", () => {
  waitForThree(() => {
    initThree();

console.log("camera after init:", camera);
console.log("THREE:", window.THREE);
  });

gsap.from("#clip-circle", {
  scale: 0,
  transformOrigin: "center",
  scrollTrigger: {
    trigger: ".svg",
    start: "center center",
    end: "bottom center",
    pin: true,
    scrub: 1,
    toggleActions: "play complete reverse reset"
  }
});
  

// gsap.to(".part1", {
//   clipPath: "circle(150% at 65% 40%)",
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "+=100%",
//     scrub: true,
//     pin: true,
//     markers: true
//   }
// });



const introTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=150%",
    scrub: true,
    pin: true
  }
});

introTl
.to(".part1", {
  clipPath: "circle(150% at 65% 40%)"
})
.to(".part1", {
  zIndex: -1,
  duration: 0
});





  const container = document.querySelector(".horizontal-scroller");
  const containerWidth =
    container.scrollWidth - document.documentElement.clientWidth;

  gsap.to(container, {
    x: () => -containerWidth,
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      start: "top top",
      scrub: 0.5,
      pin: ".horizontal-container",
      end: () => "+=" + containerWidth,
      invalidateOnRefresh: true,
    }
  });


// const zoomTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".zoom",
//     scrub: true,
//     start: "top top",
//     end: "+=1000%",
//     pin: true,
//     markers: true
//   }
// });


const tunnelProgress = { value: 0 };

const zoomTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".zoom",
    scrub: true,
    pin: true,
    start: "top top",
    end: "+=4000" // IMPORTANT: give enough scroll space
  }
});



zoomTl
.to(".zoom-circle", {
  scale: 60,
  background: "#000",
  duration: 2
}, 0)

.to(".zoom-content", {
  opacity: 0,
  duration: 1
}, 0.5)

.to(".portal-section", {
  opacity: 1,
  duration: 1.5
}, 1)

// .to(tunnelProgress, {
//   value: 1,
//   duration: 2,
//   onUpdate: () => {
//     // camera.position.z = -tunnelProgress.value * 800;
//         // console.log("TUNNEL UPDATE");

//   }
// }, 1.5)

.to(".case-archive", {
  opacity: 1,
  duration: 1
}, 3);
















// zoomTl
//   .to(".zoom-circle", {
//     scale: 20,
//     duration: 5
//   })

//   .to(".zoom-content", {
//     opacity: 0,
//     duration: 2
//   })

//   .to(".portal-section", {
//     opacity: 1,
//     duration: 2,
//     // onStart: () => console.log("PORTAL START"),
//     backgroundColor: "lime"

//   });





































//   const zoomTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".zoom",
//     scrub: true,
//     start: "top top",
//     end: "+=1000%",
//     pin: true,
//   }
// });


// zoomTl
//   .to(".zoom-circle", {
//     scale: 20
//   }, 0)

//   .to(".zoom-content", {
//     opacity: 0
//   }, 0.5)

//   .to(".portal-section", {
//     opacity: 1,
//     onStart: () => console.log("PORTAL START")
// }, 0);
//   // 🔥 FINAL SAFETY NET
//   requestAnimationFrame(() => {
//     ScrollTrigger.refresh();
//   });




























//   const zoomTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".zoom",
//     scrub: true,
//     start: "top top",
//     end: "+=1000%",
//     pin: true,
//   }
// });

// zoomTl
//   .to(".zoom-circle", {
//     scale: 20
//   }, 0)

//   .to(".zoom-content", {
//     scale: 1
//   }, 0)

//   .to(".portal-section", {
//     opacity: 1
//   }, "<");
});




// ROAD SHRINKING WHILE SCROLLING
window.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var road = document.querySelector(".road");
  var windowHeight = window.innerHeight;
  var roadHeight = windowHeight - (scrollTop / windowHeight) * windowHeight * 1;
  road.style.height = roadHeight + "px";
});






// FIXED CARDS

const cards = document.querySelector('.cards');
const cardTexts = document.querySelectorAll('.cards-text');
const images = document.querySelectorAll('.cards-image');
const cta = document.querySelector('.cards-cta');

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const cardsTop = cards.getBoundingClientRect().top;
  const cardsBottom = cards.getBoundingClientRect().bottom;

  if (cardsTop <= 0 && cardsBottom >= windowHeight) {
    images.forEach((image) => {
      image.classList.add('fixed');
    });
    cta.classList.add('fixed');
  } else {
    images.forEach((image) => {
      image.classList.remove('fixed');
    });
    cta.classList.remove('fixed');
  }

  cardTexts.forEach((cardText, index) => {
    const windowHeight = window.innerHeight;
    const cardTextTop = cardText.getBoundingClientRect().top;

    if (cardTextTop <= windowHeight / 2 || index === 0) {
      images[index].style.opacity = '1';
      images[index].style.display = 'flex';
    } else {
      images[index].style.opacity = '0';
      images[index].style.display = 'none';
    }
  });
});







// ZOOM IN

// gsap.timeline({
//   scrollTrigger: {
//     trigger: ".zoom",
//     scrub: true,
//     start: "top top",
//     end: "+=1000%",
//     pin: true,
//   }
// })
// .to(".zoom-circle", {
//   scale: 12
// }, "sameTime")
// .to(".zoom-content", {
//   scale: 1 
// }, "sameTime");






// CUSTOM CURSOR

document.addEventListener('DOMContentLoaded', function() {
  var cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  var linkElements = document.querySelectorAll('.link, .cards-cta');
  linkElements.forEach(function(element) {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('scale-up');
    });

    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('scale-up');
    });
  });
});


window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh(true);
  }, 1000);
});