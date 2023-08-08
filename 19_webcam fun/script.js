const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const context = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

canvas.willReadFrequently = true;

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((error) => {
      console.log(error);
    });
}
function paintCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.height = height;
  canvas.width = width;

  return setInterval(() => {
    context.drawImage(video, 0, 0, width, height);

    let pixels = context.getImageData(0, 0 , width, height);


    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    context.globalAlpha = 0.8;


    context.putImageData(pixels, 0, 0);

  }, 16);
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.setAttribute("download", "image");
    link.href = data; 
    link.innerHTML = `<img src="${data}" alt="image"> Download Image`; 
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
    for(let i =0; i<pixels.data.length;i+=4){
        pixels.data[i + 0] = pixels.data[i+0] + 40;
        pixels.data[i + 1] = pixels.data[i+1] - 50;
        pixels.data[i + 2] = pixels.data[i+2] * 0.5;
    }

    return pixels;
}

function rgbSplit(pixels){
    for(let i =0; i<pixels.data.length;i+=4){
        pixels.data[i - 555] = pixels.data[i+0];
        pixels.data[i + 400] = pixels.data[i+1];
        pixels.data[i - 555] = pixels.data[i+2];
    }

    return pixels;
}

function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll(".rgb input").forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (let i = 0; i < pixels.data.length; i += 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (
        red >= levels.rmin &&
        green >= levels.gmin &&
        blue >= levels.bmin &&
        red <= levels.rmax &&
        green <= levels.gmax &&
        blue <= levels.bmax
      ) {
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }

getVideo();
video.addEventListener("canplay", paintCanvas);
