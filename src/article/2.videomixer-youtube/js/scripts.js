    const tag = document.createElement("script");
    tag.id = "video-script";
    tag.src = "https://www.youtube.com/iframe_api";
    const [firstScriptTag] = document.getElementsByTagName("script");
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let player;

    window.onPlayerReady = (event) => {
      console.log("ready");
      resizeVideo()
      document.querySelector('#play').addEventListener('click', function() {
        event.target.playVideo();
        window.setTimeout(function(){
          document.querySelector('#video').style.display = 'block';
          document.querySelector('#play').style.display = 'none';
          document.querySelector('#cams').style.display = 'block';
        }, 400);
      });
      document.querySelector('#stop').addEventListener('click', function() {
        event.target.stopVideo();
        disableSwitcher();
      });
    };

    window.onPlayerStateChange = (event) => {
      console.log(event.data);
      if (event.data === 0) {
        console.log("done");
      }
      if (event.data === 1) {
        console.log("start playing");
        switcher();
      }
      if (event.data === 2) {
        console.log("stop playing");
        disableSwitcher();
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player("video", {
        width: 1920,
        height: 1080,
        videoId: youtube_id,
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'enablejsapi': 1,
          'fs': 0,
          'modestbranding': 1
        },
        events: {
          onReady: window.onPlayerReady,
          onStateChange: window.onPlayerStateChange
        }
      });
    };

    function switcher() {

      document.querySelector('#cam1').addEventListener('click', function() {
        video.style.left = "0";
        video.style.right = "auto";
        video.style.top = "0";
        video.style.bottom = "auto";

      });
      document.querySelector('#cam2').addEventListener('click', function() {
        video.style.left = "auto";
        video.style.right = "0";
        video.style.top = "0";
        video.style.bottom = "auto";
        console.log('ok');
      });
      document.querySelector('#cam3').addEventListener('click', function() {
        video.style.left = "0";
        video.style.right = "auto";
        video.style.top = "auto";
        video.style.bottom = "0";
      });
    }

    function disableSwitcher() {
      var video = document.querySelector('#video');
      var cams = document.querySelector('#cams');
      var play = document.querySelector('#play');

      video.style.display = 'none';
      cams.style.display = 'none';
      play.style.display = 'block';
    }

    function resizeVideo() {
      var video = document.querySelector('#video');
      var container = document.querySelector('#mainscreen');
     
      var w = container.offsetWidth * 2;
      var h = container.offsetHeight * 2;

      video.style.width = w+"px";
      video.style.height = h+"px"
    }
    
    window.onresize = resizeVideo;
  