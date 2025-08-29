let imgList = document.querySelectorAll("img");
let imgsrc = [
  "./asserts/eximg1.jpeg",
  "./asserts/eximg2.jpeg",
  "./asserts/images.jpeg",
  "./asserts/image2.jpeg",
  "./asserts/image3.jpeg",
  "./asserts/image3.jpeg",
  "./asserts/eximg1.jpeg",
  "./asserts/eximg2.jpeg",
  "./asserts/images.jpeg",
  "./asserts/image2.jpeg",
  "./asserts/image3.jpeg",
  "./asserts/image3.jpeg",
];

function startGame() {
  let cont = document.getElementById("cont");
  cont.style.display = "block";
  document.getElementById("entry").style.display = "none";
  start();
}
// function restart(){
//     return `<div class="text-center my-5" id="restart-section" style="display:none;">
//                 <h2 class="mb-3">🎉 Great job! You’ve completed the game! 🎉</h2>
//                 <p class="lead">Want to challenge yourself again?</p>
//                 <button class="btn btn-success btn-lg mt-3" onclick="restartGame()">🔄 Restart Game</button>
//             </div>`
// }
// audio controle
let audios = document.querySelectorAll("audio");

let opendimg = [];
let sloved = 0;
let gover = 0;
let tim = "";
function suffle(array) {
  let len = array.length;
  let randli = [];
  let temp = "";
  for (i in array) {
    let rand = Math.floor(Math.random() * len);
    randli.push(rand);
    if (rand in randli) {
      continue;
    } else {
      temp = array[i];
      array[i] = array[rand];
      array[rand] = temp;
    }
  }
  return array;
}
suffle(imgsrc);
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

imgList.forEach((img, index) => {
  img.addEventListener("click", () => {
    audios[1].play();
    if (opendimg.length < 2 && !img.classList.contains("flipped")) {
      img.src = imgsrc[index];
      img.classList.add("flipped");
      opendimg.push(img);
      close();
    }
  });
});
function close() {
  if (opendimg.length >= 2) {
    if (opendimg[0].src == opendimg[1].src) {
      audios[2].play();
      updatescore();
      opendimg.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            createSparkle(
              x + Math.random() * 50 - 25,
              y + Math.random() * 50 - 25
            );
          }, i * 50);
        }
      });
      opendimg[0].src = "";
      opendimg[1].src = "";
      opendimg = [];
      gover++;
      // if(gover == imgList.length/2){
      //     // alert(`game over \n You won the game \n You finished the game with in ${tim} \n click ok to restart`)
      //     endcard=document.createElement('div')
      //     endcard.innerHTML=`<h3>game over</h3> <p>You won the game <br> You finished the game with in ${tim} <br> click ok to restart</p>`
      //     document.getElementById('body').innerHTML=endcard
      //     // document.getElementById('mode').style.display='block'
      //     audios[0].play()
      //     // location.reload()
      // }
      if (gover == imgList.length / 2) {
        let endcard = document.createElement("div");
        endcard.innerHTML = `
                            <h3>Game Over</h3>
                            <p>You won the game <br> 
                            You finished the game within ${tim} <br> 
                            </p>
                            <button type="button" class="btn bg-primary" onclick="location.reload()" id="resatart">Play again</button>
                        `;
        endcard.classList.add("end");
        document.getElementById("body").innerHTML = "";
        document.getElementById("body").appendChild(endcard);

        audios[0].play();
      }
    } else {
      setInterval(() => {
        if (opendimg.length >= 2) {
          opendimg[0].src = "../asserts/bgCard.jpg";
          opendimg[1].src = "../asserts/bgCard.jpg";
          opendimg[0].classList.remove("flipped");
          opendimg[1].classList.remove("flipped");
          audios[0].play();
          opendimg = [];
        }
      }, 1009);
    }
  }
}
function updatescore() {
  document.getElementById("score").innerHTML = `<p>score:<b>${
    gover + 1
  }</b></p>`;
}

function timerfun() {
  document.getElementById("timer").textContent = `Timer:`;
}
let timer = true;
timerfun();

// online refernce for timier
let h = 0,
  m = 0,
  s = 0,
  t;

function start() {
  if (!t)
    t = setInterval(() => {
      s++;
      if (s == 60) {
        s = 0;
        m++;
      }
      if (m == 60) {
        m = 0;
        h++;
      }
      tim = `Timer:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      document.getElementById("timer").textContent = tim;
    }, 1000);
}

function stop() {
  clearInterval(t);
  t = null;
}

function reset() {
  stop();
  h = m = s = 0;
  console.log("00:00:00");
}
