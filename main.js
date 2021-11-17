// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
//Other targets
//Had to change the numeric ids in the HTML to text because it wasn't working for some reason
const byronsHeart = document.querySelector('article#byron footer ul li span');
const rashaunsHeart = document.querySelector('article#rashaun footer ul li span');
const mattsHeart = document.querySelector('article#matt footer ul li span');
const yunchusHeart = document.querySelector('article#yunchu footer ul li span');
const husseinsHeart = document.querySelector('article#hussein footer ul li span');
const errorPopUp = document.querySelector('#modal');
const errorMessage = document.querySelector('#modal-message');

//Dom content loaded
window.addEventListener("DOM content loaded", start());

function start () {
    byronsHeart.addEventListener('click', () => {
      allHeartFunctionality(byronsHeart);
      })   
    rashaunsHeart.addEventListener('click', () => {
    allHeartFunctionality(rashaunsHeart);
    })
    mattsHeart.addEventListener('click', () => {
      allHeartFunctionality(mattsHeart);
    })
    yunchusHeart.addEventListener('click', () => {
      allHeartFunctionality(yunchusHeart);
    })
    husseinsHeart.addEventListener('click', () => {
      allHeartFunctionality(husseinsHeart);
    });
}

//This is the functionality to update the heart
async function allHeartFunctionality(heart) {
  if(heart.innerHTML === FULL_HEART) {
    heart.classList.remove('activated-heart')
    heart.innerHTML = EMPTY_HEART;
  }else try{
  const data = await mimicServerCall();
          firstHeartUpdate(heart);
       }catch (error) {
        errorBehaviour(error);
      }
  }


  //This is the functionality to first make the heart red when there is a successful response
function firstHeartUpdate (heart) {
  heart.classList.add('activated-heart')
  heart.innerHTML = FULL_HEART;
}

//This is the functionality to manage the popup if there is an error
function errorBehaviour(error) {
  console.log(error);
  errorPopUp.classList.remove('hidden');
  errorMessage.innerHTML = 'Random server error. Try again';
  setTimeout(function(){ errorPopUp.classList.add('hidden'); }, 3000);
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

