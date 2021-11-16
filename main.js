// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
//Other targets
//Had to change the numeric ids in the HTML to text because it wasn't working for some reason
//Come back to retry ID numbers again later
const byronsHeart = document.querySelector('article#byron footer ul li span');
const rashaunsHeart = document.querySelector('article#rashaun footer ul li span');
const mattsHeart = document.querySelector('article#matt footer ul li span');
const yunchusHeart = document.querySelector('article#yunchu footer ul li span');
const husseinsHeart = document.querySelector('article#hussein footer ul li span');
const errorPopUp = document.querySelector('#modal');
const errorMessage = document.querySelector('#modal-message');

//Dom content loaded
window.addEventListener("DOM content loaded", start());

//Add an event listener for the heart click - event listener is added to 
//each heart separately - see if there is a way I can handle this in a more concise way at the end...
function start () {
    byronsHeart.addEventListener('click', () => {
      allHeartFunctionality(byronsHeart);
      })
    //When the heart is already red, add an event listener if the user clicks again to remove the activated heart class
    clickHeart(byronsHeart);
    rashaunsHeart.addEventListener('click', (event) => {
    //STILL DO DO - Update each of the below to use the same functions once Byron's heart is working
    clickHeart(rashaunsHeart);
    })
    mattsHeart.addEventListener('click', (event) => {
    clickHeart(mattsHeart);
    })
    yunchusHeart.addEventListener('click', (event) => {
    clickHeart(yunchusHeart);
    })
    husseinsHeart.addEventListener('click', (event) => {
    clickHeart(husseinsHeart);
    });
}

/*This is the functionality if a user clicks a heart after it is already a full heart
NEED TO NOT HAVE THE LISTENER ON WHILE THE HEART IS FULL - it's running the server call when the user clicks 
and the heart is full*/
function clickHeart(heart) {
  heart.addEventListener('click', () => {
    if(heart.innerHTML === FULL_HEART) {
      heart.classList.remove('activated-heart')
      heart.innerHTML = EMPTY_HEART;
    }
  });
};

//This is the functionality to call the server and handle the response
//Still having issues with the error message - success is working ok - can't get the catch code block to run
function allHeartFunctionality(heart) {
  mimicServerCall()
  .then(function(data) {
  //If the click was successful, change the heart to a full heart, add the activated-heart class to make the heart appear red
    try {
      console.log(data.toString());
        if (data.toString() !== 'Random server error. Try again.') {
          firstHeartUpdate(heart);
        }
  //If the click was unsuccessful: Unhide the error modal and pass the message into the error modal      
    } catch (error) {
        console.log('error!');
        errorBehaviour(error);
      }
  });
};

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
  //STILL TO DO Set a timeout on the error modal to disapear (insert .hidden class again) after 3 secs (3000)
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

