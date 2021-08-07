const app = () => {
  // tag audio
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  // circle in svg attr
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // Sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  // Time display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  //   console.log(timeSelect);
  //get the length of outline SVGGeometryElement.getTotalLength()
  const outlineLenght = outline.getTotalLength();
  // duration
  let fakeDuration = 600;
  // The stroke-dasharray attribute is a presentation attribute defining the pattern of dashes and gaps used to paint the outline of the shape;
  //   used this one we have dashe circle
  outline.style.strokeDasharray = outlineLenght;
  outline.style.strokeDashoffset = outlineLenght;

  // play sound
  play.addEventListener('click', () => {
    //Audio play() Method
    checkPlaing(song);
  });
  // function specific to stop and play sounds
  const checkPlaing = song => {
    console.log(song.paused);
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };
  // select sound on btns
  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
  });
  //pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaing(song);
    });
  });
  //animate circle
  // attr for video and audio Это событие timeupdate часто используется вместе с currentTime свойство объекта аудио/видео, которое возвращает текущее положение воспроизведения аудио/видео в секундах.
  //   updates every seconds
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    console.log(currentTime);
    //   истечение времени
    let elapsed = fakeDuration - currentTime;
    //   когда дойте до 60 то обновиться снова до 0
    let seconds = Math.floor(elapsed % 60);
    let minuts = Math.floor(elapsed / 60);

    //   animate the circle
    let progress = outlineLenght - (currentTime / fakeDuration) * outlineLenght;
    outline.style.strokeDashoffset = progress;
    //   animate the text
    timeDisplay.textContent = `${minuts}:${seconds}`;
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  };
};

app();
