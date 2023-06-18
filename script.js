const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let rectangleHeight = 100; // Initial height of the rectangle
let direction = 'increase'; // Initial direction of the animation
let animationStarted = false;
let recstart = 540;
let recend = 1;
let rotationAngle = 0; 
let rectopen = 0;
let shifting=0;
let shiftingrt=0;
let recheight=90;
let recwidth=160;
let scale=1
let secondscene=false

const image = new Image();
image.src = 'heart.png';

const imagefirst= new Image()
imagefirst.src='mainimage.png';

let mediaRecorder; // MediaRecorder instance
let chunks = []; // Recorded video chunks
function animatescene1() {
  // Clear the canvas
  context.fillStyle = 'pink'; // Set the desired background color
  context.fillRect(0, 0, canvas.width, canvas.height);
  // Calculate the center of the rectangle
  const rectangleCenterX = recstart + 100;
  const rectangleCenterY = recend + rectangleHeight / 2;

  // Calculate the coordinates of the first triangle vertex on the rectangle
  const triangleVertex1X = rectangleCenterX - 100;
  const triangleVertex1Y = rectangleCenterY - 50;

  // Calculate the coordinates of the second triangle vertex on the rectangle
  const triangleVertex2X = rectangleCenterX;
  const triangleVertex2Y = rectangleCenterY - rectopen;
  const triangleVertex2XY = rectangleCenterY;

  // Calculate the coordinates of the third triangle vertex on the rectangle
  const triangleVertex3X = rectangleCenterX + 100;
  const triangleVertex3Y = rectangleCenterY - 50;
  
  if(shifting>0){
  context.save();
  context.fillStyle = '#ffffe0';
  context.beginPath();
  context.moveTo(triangleVertex1X+ shiftingrt, triangleVertex1Y+shifting);
  context.lineTo(triangleVertex2X+ shiftingrt, triangleVertex2Y+shifting);
  context.lineTo(triangleVertex3X+ shiftingrt, triangleVertex3Y+shifting);
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
  }

    // Draw the new triangle under the existing triangle and rectangle
    context.save();
    context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Semi-transparent red color
    context.beginPath();
    context.moveTo(triangleVertex1X+ shiftingrt, triangleVertex1Y+ shifting );
    context.lineTo(triangleVertex2X+ shiftingrt, triangleVertex2XY +shifting);
    context.lineTo(triangleVertex3X+ shiftingrt, triangleVertex3Y+ shifting);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();

   // Draw the new triangle under the existing triangle and the new rectangle
    context.save();
    context.fillStyle = 'white'; // Semi-transparent red color
    context.beginPath();
    context.moveTo(triangleVertex1X+20, triangleVertex1Y+10);
    context.lineTo(triangleVertex1X+20, triangleVertex1Y+100);
    context.lineTo(triangleVertex1X+180, triangleVertex1Y+100);
    context.lineTo(triangleVertex3X-20, triangleVertex3Y+10)
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  
  let imageX1 = triangleVertex1X+20;
  let imageY1 = triangleVertex1Y+10;
  let imageWidth1= 160;
  let imageHeight1 = 90;
  context.drawImage(imagefirst, imageX1, imageY1, imageWidth1, imageHeight1);

  context.save();
  context.fillStyle = '#ffffe0'; // Semi-transparent red color
  context.beginPath();
  context.moveTo(recstart+ shiftingrt, recend +shifting);
  context.lineTo(recstart+ shiftingrt, recend+rectangleHeight+shifting);
  context.lineTo(recstart+200+ shiftingrt, recend+rectangleHeight+shifting);
  context.lineTo(recstart+200+ shiftingrt, recend+shifting);
  context.lineTo(rectangleCenterX+ shiftingrt, rectangleCenterY+shifting);
  context.lineTo(recstart+ shiftingrt,recend+shifting)
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
  
  // Draw the triangle on top of the rectangle
  if(shifting==0){
  context.save();
  context.fillStyle = '#ffffe0';
  context.beginPath();
  context.moveTo(triangleVertex1X+ shiftingrt, triangleVertex1Y+shifting);
  context.lineTo(triangleVertex2X+ shiftingrt, triangleVertex2Y+shifting);
  context.lineTo(triangleVertex3X+ shiftingrt, triangleVertex3Y+shifting);
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();
  }
  // Draw the image at one edge of the triangle
  const imageX = recstart + 90;
  const imageY = recend + rectangleHeight - 60;
  const imageWidth = 20;
  const imageHeight = 20;
  context.drawImage(image, imageX+ shiftingrt, imageY+shifting, imageWidth, imageHeight);


  // Update the position and rotation angle
  if (recend < 310) {
    if(recend>300 &&recend <309){
      recend+=2
    }else{    
      recend += 4;}
  }else if(recend>310){
    if(rectopen<100)
    rectopen += 3;
    else{
      shifting +=2
      if(shifting>150){
        shiftingrt+=8
      }
      
    }
  }

  // Request the next animation frame
  if (animationStarted) {
    requestAnimationFrame(animatescene1);
  }
}

function animatescene2() {
// Animation logic for scene 2
// Clear the canvas
if(secondscene){
  context.fillStyle = 'pink'; // Set the desired background color
  context.fillRect(0, 0, canvas.width, canvas.height);  

context.save();

// Translate the canvas to the center of the rectangle
const centerX = 560 + 160 / 2;
const centerY = 320 + 90 / 2;
context.translate(centerX, centerY);

context.scale(scale,scale)

// Rotate the canvas by the desired angle (in radians)
const angleInRadians = (rotationAngle*Math.PI) / 2; // Adjust this value for your desired rotation angle
context.rotate(angleInRadians);

// Translate the canvas back to the original position
context.translate(-centerX, -centerY);

// Draw the rotated rectangle
context.fillStyle = 'white';
context.fillRect(560, 320, 160, 90);
context.strokeStyle = 'black';
context.lineWidth = 1;
context.strokeRect(560, 320, 160, 90);


const imageWidth = recwidth ; // Adjust the width of the image based on the scaling
const imageHeight = recheight ; // Adjust the height of the image based on the scaling
const imageX = 560 - (imageWidth - 160) / 2; // Adjust the X position of the image to keep it centered
const imageY = 320 - (imageHeight - 90) / 2; // Adjust the Y position of the image to keep it centered
context.drawImage(imagefirst, imageX, imageY, imageWidth, imageHeight);

// Restore the previous canvas state
context.restore();
}

if(rotationAngle<1){
  rotationAngle+=0.01
  scale+=0.02
}else {
  // Draw text below the rotated rectangle
  context.font = '20px Arial';
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.fillText('From Varun and Archit', 640, 100); // Adjust the position of the text as needed
}


  // Request the next animation frame
  if (animationStarted) {
    requestAnimationFrame(animatescene2);
  }
}

function animate() {
  // Call the first scene animation initially
  animatescene1();
  setTimeout(function () {
    animatescene2();
    secondscene=true
  },6500)
}


function startAnimation() {
  if (!animationStarted) {
    animationStarted = true;
    rectangleText = document.getElementById('textInput').value;
    animate();
  }
}

function captureScreenshot() {
  const durationInput = document.getElementById('durationInput');
  const duration = parseInt(durationInput.value, 10) * 1000; // Convert to milliseconds

  // Create a new video element
  const video = document.createElement('video');
  video.width = canvas.width;
  video.height = canvas.height;
  const stream = canvas.captureStream(); // Capture the canvas as a stream

  // Create a new MediaRecorder instance to record the stream
  mediaRecorder = new MediaRecorder(stream);

  // Start recording
  mediaRecorder.start();

  // Handle data available event
  mediaRecorder.addEventListener('dataavailable', function (event) {
    chunks.push(event.data);
  });

  // Handle stop event
  mediaRecorder.addEventListener('stop', function () {
    // Create a new Blob from the recorded chunks
    const videoBlob = new Blob(chunks, { type: 'video/webm' });

    // Set the source of the video element as the recorded Blob
    video.src = URL.createObjectURL(videoBlob);

    // Create a download link for the video
    const downloadLink = document.createElement('a');
    downloadLink.href = video.src;
    downloadLink.download = 'animation.webm';

    // Trigger the download
    downloadLink.click();

    // Clean up resources
    chunks.length = 0;
    video.src = '';
    stream.getTracks().forEach((track) => track.stop());
  });

  // Stop recording after the specified duration
  setTimeout(function () {
    mediaRecorder.stop();
  }, duration);
}
// Start the animation
animate();
