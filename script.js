console.log('Your soundtrack,your way');
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let prog = document.getElementById('prog');
let motion = document.getElementById('motion');
let masterSongName = document.getElementById('masterSongName');
let songList = Array.from(document.getElementsByClassName('songList'));

let songs =[
    {songname:"Shutdown - Blackpink",filePath:"1.mp3",coverPath:"covers/blackpink.jpeg"},
    {songname:"Unstoppable - Sia",filePath:"2.mp3",coverPath:"covers/uns.jpeg"},
    {songname:"Lover - Taylor Swift",filePath:"3.mp3",coverPath:"covers/lover.jpeg"},
    {songname:"Wavin'Flag - K'naan",filePath:"4.mp3",coverPath:"covers/wav.jpeg"},
    {songname:"I wanna be yours - Arctic Monkeys",filePath:"5.mp3",coverPath:"covers/iwa.jpeg"},
    {songname:"Gasolina - Daddy Yankee",filePath:"6.mp3",coverPath:"covers/gasolina.jpeg"},
    {songname:"On My Way - Alan Walker , Farruko and Sabrina Carpenter",filePath:"7.mp3",coverPath:"covers/onw.jpeg"}
]

songList.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});




masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.querySelector('img').src = 'pause.png';

         
        motion.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.querySelector('img').src = 'play.png'; 
        motion.style.opacity = 0;
    }
});



audioElement.addEventListener('timeupdate', () => {
    let progValue = (audioElement.currentTime / audioElement.duration) * 100;
    if (isFinite(progValue)) {
        prog.value = progValue;
    }
});

prog.addEventListener('input', () => {
    let newTime = (prog.value / 100) * audioElement.duration;
    if (isFinite(newTime)) {
        audioElement.currentTime = newTime;
    }
});



prog.addEventListener('change', () => {
    let newTime = (prog.value / 100) * audioElement.duration;
    if (isFinite(newTime)) {
        audioElement.currentTime = newTime;
    }
});
const makeAllPlays = (clickedPlayButton) => {
    Array.from(document.getElementsByClassName('itemPlay')).forEach((element) => {
        if (element !== clickedPlayButton) {
            element.src = 'play1.png';
            
        }
    });
}

Array.from(document.getElementsByClassName('itemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays(e.target); 
        if (e.target.tagName === 'IMG') {
            if (e.target.src.includes('pause1.png')) {
                audioElement.pause();
                e.target.src = 'play1.png'; 
                masterPlay.querySelector('img').src = 'play.png';
                motion.style.opacity = 0; 
                audioElement.play();
                e.target.src = 'pause1.png'; 
                masterPlay.querySelector('img').src = 'pause.png';
                motion.style.opacity = 1;
            }
        }
        
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.src = `songs/${songIndex + 1}.mp3`;

        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('img').src = "play1.png";
        masterPlay.classList.add('img').src = "pause1.png";
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex=0;
    }else{
    songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('img').src="play1.png";
        masterPlay.classList.add('img').src="pause1.png";
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex =0;
    }else{
    songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('img').src="play1.png";
        masterPlay.classList.add('img').src="pause1.png";
})








