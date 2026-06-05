const message = "Bloomhaus Labs LLC is loading";
let revealMode = false;
let revealProgress = 0;
let holdCounter = 0;

// Get the canvas element and context
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for the ASCII rain
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
const charArray = characters.split("");

// Column settings
const fontSize = 16;
const columns = canvas.width / fontSize;
const rows = Math.floor(canvas.height / fontSize);
const drops = Array(Math.floor(columns)).fill(0);



// const message = "BLOOMHAUS LABS LLC IS LOADING";
// let revealProgress = 0; // controls how much is revealed
let revealingMessage = false;



function getMessageGrid() {
  const charsPerRow = Math.floor(canvas.width / fontSize);
  const startCol = Math.floor((charsPerRow - message.length) / 2);
  const row = Math.floor(canvas.height / fontSize / 2);

  const grid = [];

  for (let i = 0; i < message.length; i++) {
    grid.push({
      col: startCol + i,
      row: row,
      char: message[i]
    });
  }

  return grid;
}

const messageGrid = getMessageGrid();

setTimeout(() => {
  revealMode = true;
}, 4000); // start morphing after 4s


// Function to draw the matrix rain
function drawMatrix() {
  requestAnimationFrame(drawMatrix);

  // fade effect for trailing rain
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0ae448";
  ctx.font = fontSize + "px monospace";

  const messageStartCol = Math.floor(columns / 2 - message.length / 2);
  const messageRow = Math.floor(rows / 2);

  // 👇 THIS LOOP WAS MISSING
  for (let x = 0; x < drops.length; x++) {

    let charToDraw;

    if (
      revealMode &&
      drops[x] === messageRow &&
      x >= messageStartCol &&
      x < messageStartCol + message.length
    ) {
      const letterIndex = x - messageStartCol;

      if (letterIndex <= revealProgress) {
        charToDraw = message[letterIndex];
      } else {
        charToDraw = charArray[Math.floor(Math.random() * charArray.length)];
      }

    } else {
      charToDraw = charArray[Math.floor(Math.random() * charArray.length)];
    }

    ctx.fillText(charToDraw, x * fontSize, drops[x] * fontSize);

    // move rain down
    if (drops[x] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }

    drops[x]++;
  }

  // ✨ progress message reveal
  if (revealMode && revealProgress < message.length) {
    revealProgress += 0.03;
  }

  // ⏸ hold then trigger house animation
  if (revealProgress >= message.length) {
    holdCounter++;

    if (holdCounter > 120) {
      startApp();
    }
  }
}

// Adjust canvas on resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start the animation
// setInterval(drawMatrix, 50);


let matrixRunning = true;
let matrixInterval = setInterval(drawMatrix, 50);

function stopMatrixRain() {
  matrixRunning = false;
  clearInterval(matrixInterval);
}


// class TextScramble {
//   constructor(el) {
//     this.el = el;
//     this.chars = '!<>-_\\/[]{}—=+*^?#________';
//   }

//   setText(newText) {
//     const oldText = this.el.innerText;
//     const length = Math.max(oldText.length, newText.length);
//     const promise = new Promise(resolve => this.resolve = resolve);
//     this.queue = [];

//     for (let i = 0; i < length; i++) {
//       const from = oldText[i] || '';
//       const to = newText[i] || '';
//       const start = Math.floor(Math.random() * 20);
//       const end = start + Math.floor(Math.random() * 20);
//       this.queue.push({ from, to, start, end });
//     }

//     cancelAnimationFrame(this.frameRequest);
//     this.frame = 0;
//     this.update();
//     return promise;
//   }

//   update() {
//     let output = '';
//     let complete = 0;

//     for (let i = 0; i < this.queue.length; i++) {
//       let { from, to, start, end, char } = this.queue[i];

//       if (this.frame >= end) {
//         complete++;
//         output += to;
//       } else if (this.frame >= start) {
//         if (!char || Math.random() < 0.28) {
//           char = this.randomChar();
//           this.queue[i].char = char;
//         }
//         output += char;
//       } else {
//         output += from;
//       }
//     }

//     this.el.innerText = output;

//     if (complete === this.queue.length) {
//       this.resolve();
//     } else {
//       this.frameRequest = requestAnimationFrame(this.update.bind(this));
//       this.frame++;
//     }
//   }

//   randomChar() {
//     return this.chars[Math.floor(Math.random() * this.chars.length)];
//   }
// }


// const loaderText = document.getElementById("loaderText");
// const fx = new TextScramble(loaderText);

// function wait(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function startIntroSequence() {

//   // 1️⃣ Let matrix rain run first
//   await wait(3000);

//   // 2️⃣ Stop the rain
//   stopMatrixRain();

//   // 3️⃣ Show scramble text
//   loaderText.style.opacity = 1;

//   // 4️⃣ Scramble into message
//   await fx.setText("Bloomhaus Labs LLC is loading...");

//   // 5️⃣ Hold message
//   await wait(1500);

//   // 6️⃣ Fade everything out
//   document.getElementById("matrix").style.transition = "opacity 1.5s";
//   loaderText.style.transition = "opacity 1.5s";

//   document.getElementById("matrix").style.opacity = 0;
//   loaderText.style.opacity = 0;

//   // 7️⃣ Trigger your drawing animation here
//   startDrawingAnimation();
// }

// startIntroSequence();


function startDrawingAnimation() {
  console.log("Start drawing animation now 🎨");

  gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

  let paths = splitPaths("#house");

  let duration = 5,
      distance = 0,
      tl = gsap.timeline();

  paths.forEach(segment => distance += segment.getTotalLength());

  paths.forEach(segment => {
    tl.from(segment, {
      drawSVG: 0,
      ease: "none",
      duration: duration * (segment.getTotalLength() / distance)
    });
  });

  // helper function
  function splitPaths(paths) {
    let toSplit = gsap.utils.toArray(paths),
        newPaths = [];

    if (toSplit.length > 1) {
      toSplit.forEach(path => newPaths.push(...splitPaths(path)));
    } else {
      let path = toSplit[0],
          rawPath = MotionPathPlugin.getRawPath(path),
          parent = path.parentNode,
          attributes = [].slice.call(path.attributes);

      newPaths = rawPath.map(segment => {
        let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            i = attributes.length;

        while (i--) {
          newPath.setAttributeNS(null, attributes[i].nodeName, attributes[i].nodeValue);
        }

        newPath.setAttributeNS(
          null,
          "d",
          "M" + segment[0] + "," + segment[1] + "C" + segment.slice(2).join(",") + (segment.closed ? "z" : "")
        );

        parent.insertBefore(newPath, path);
        return newPath;
      });

      parent.removeChild(path);
    }
    return newPaths;
  }
}



function revealMatrixMessage() {
  revealingMessage = true;

  const revealInterval = setInterval(() => {
    revealProgress += 0.03;

    if (revealProgress >= 1) {
      clearInterval(revealInterval);

      // wait so the message can sit for a moment
      setTimeout(() => {

        // 1️⃣ Fade out matrix canvas
        canvas.style.transition = "opacity 1.5s ease";
        canvas.style.opacity = 0;

        // 2️⃣ Stop the rain loop
        stopMatrixRain();

        // 3️⃣ After fade completes, start drawing animation
        setTimeout(() => {
          startDrawingAnimation();
        }, 1600);

      }, 1500);
    }
  }, 80);
}

setTimeout(revealMatrixMessage, 3000);

function startApp() {
  if (window.appStarted) return;
  window.appStarted = true;

  gsap.to("#matrix", {
    opacity: 0,
    duration: 1.5,
    onComplete: () => {
      document.getElementById("matrix").style.display = "none";
      document.getElementById("app").classList.remove("hidden");

      // Start the house drawing animation
      gsap.fromTo(
        "#house",
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 3, ease: "power2.inOut" }
      );
    }
  });
}