//Picking canvas and making sure it fits the full screen
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Now getting context, in this case 2d, technically, because 
//we got the frames (images) which look as 3d
//but are actually 2d, and on second line counting our frames/images.
const context = canvas.getContext("2d");
const frameCount = 179;

//This code is responsible for picking a frame and 
//add frame one by one 
const currentFrame = (index) => `./ball-frames/${(index + 1).toString()}.jpg`;

//Creating for loop
const images = [];
let ball = { frame: 0 };
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i); //the index
    images.push(img);
}

//make the ball move on scroll
gsap.to(ball, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      pin: "canvas",
      end: "500%",
    },
    onUpdate: render,
  });

  

//Loads up render function
images[0].onload = render;

//Creating render function, clearRect - clear entire canvas
//drawImage - pass image on frame we're on.
function render() {
    context.canvas.width = images[0].width;
    context.canvas.height = images[0].height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0);
}

