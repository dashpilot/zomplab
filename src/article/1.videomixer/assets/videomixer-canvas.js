var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var video = document.getElementById('video');

// set canvas size = video size when known

video.addEventListener('loadedmetadata', function() {
  canvas.width = 1280;
  canvas.height = 240;
});

video.addEventListener('canplay', function() {
  canvas.width = 1280;
  canvas.height = 240;
  var $this = this; //cache
  ctx.drawImage($this, 0, 720, 3840, 720, 0, 0, 1280, 240);
});

video.addEventListener('play', function() {
  var $this = this; //cache
  (function loop() {
    if (!$this.paused && !$this.ended) {
      ctx.drawImage($this, 0, 720, 3840, 720, 0, 0, 1280, 240);
      setTimeout(loop, 1000 / 25); // drawing at 30fps
    }
  })();

  /*
  // automatically switch
  var intervalID = window.setInterval(myCallback, 3500);

  function myCallback() {
    if (!$this.paused && !$this.ended) {
      let rand = Math.floor(Math.random() * 3) + 1;
      console.log(rand);
      document.querySelector('#cam' + rand).click();
    }
  }
  */

}, 0);

document.querySelector('#cam1').addEventListener('click', function() {
  video.style.marginLeft = "100%";
});
document.querySelector('#cam2').addEventListener('click', function() {
  video.style.marginLeft = "0%";
});
document.querySelector('#cam3').addEventListener('click', function() {
  video.style.marginLeft = "-100%";
});