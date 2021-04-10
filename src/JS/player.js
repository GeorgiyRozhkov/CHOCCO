
const playerContainer = $(".player");
const playerWrap = document.querySelector(".player__wrap");
const playerVideo = document.querySelector(".player__video");
const playerStart = document.querySelector(".player__start-btn");
const playerPause = document.querySelector(".player__pause-btn");
const playerPlayback = document.querySelector(".player__playback");
const playerControls = document.querySelector(".player__controls");
const playerVolumeIcon = document.querySelector(".player__volume-icon");


let player;

let eventsInit = () => {

  const PlayPauseVideo = () =>{
    if(playerContainer.hasClass("player__active")){
      player.pauseVideo();
    }else{
      player.playVideo();
      $(playerControls).addClass("player__controls_active")
    }
  }

  $(playerStart).click(e =>{
    e.preventDefault();
    PlayPauseVideo();
  });
  $(playerPause).click(e =>{
    e.preventDefault();
    PlayPauseVideo();
  });

  $(".player__volume").click(e =>{
    const bar = $(e.currentTarget);
    const clickPosition = e.originalEvent.layerX;
    let newButtonPositionPercent = (clickPosition / bar.width()) * 100;
    const newVolumePosition = Math.round(newButtonPositionPercent);

    if(newVolumePosition <= 0){
      $(playerVolumeIcon).addClass("mute");
    }else{
      $(playerVolumeIcon).removeClass("mute");
      player.unMute();
    }

    $(".player__volume-btn").css({
      left: `${newButtonPositionPercent}%`
    });
    player.setVolume(newVolumePosition);
  });

  const muteByIcon = () =>{
    if ($(playerVolumeIcon).hasClass("mute")){
      $(playerVolumeIcon).removeClass("mute");
      player.unMute();
    }else{
      $(playerVolumeIcon).addClass("mute");
      player.mute();
    };
  }

  $(playerVolumeIcon).click(e =>{
    muteByIcon();
  });

  $(".player__playback").click(e =>{
    const bar = $(e.currentTarget);
    const clickPosition = e.originalEvent.layerX;
    let newButtonPositionPercent = (clickPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__playback-btn").css({
      left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSec);
  });
  
  $(".player__splash").click(e =>{
    player.playVideo();
  })
};

const formatTime = timeSec =>{
  const roundTime = Math.round(timeSec);


  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num){
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;
};

const onPlayerReady = () =>{
  let interval;
  const durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined"){
    clearInterval(interval);
  }
  interval = setInterval(() =>{
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;
    $(".player__playback-btn").css({
      left: `${completedPercent}%`
    });
    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
};

const onPlayerStateChange = event =>{
// -1 – воспроизведение видео не началось
// 0 – воспроизведение видео завершено
// 1 – воспроизведение
// 2 – пауза
// 3 – буферизация
// 5 – видео находится в очереди
  switch (event.data){
    case 1:
      playerContainer.addClass("player__active");
      $(playerControls).addClass("player__controls_active");
      $(".player__splash").css({
        display: "none"
      })
      break;

    case 2:
      playerContainer.removeClass("player__active");
      $(playerControls).removeClass("player__controls_active");
      $(".player__splash").css({
        display: "block"
      })
      break;  
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '400',
    width: '665',
    videoId: '8Z1eMy2FoX4',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
     },
     playerVars: {
       controls: 0,
       disablekb: 0,
       showinfo: 0,
       rel: 0,
       autoplay: 0,
       modestbranding: 0
     }
  });
}

eventsInit();
