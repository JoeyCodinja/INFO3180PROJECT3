'use strict'

window.onload = function(){
                            gameStart();
                            randomCardSelect();                          
                            for(var i=0;i<=document.getElementsByClassName('card').length-1;i++)
                            {
                              document.getElementsByClassName('card')[i].onclick = flipCard;                              
                            }
                            //Cache Renew If Files have been renewed 
                            window.applicationCache.addEventListener('obsolete', function(evt)
                                                                     {
                                                                       console.log('Obsolete Cache Detected, Updating...' +evt);
                                                                       window.applicationCache.update();
                                                                     }, false);

  
                          };

var suits = []; 
var cardpack = [];
var turns = 0;
var match_audio;
var audio_source;

function turnCounter()//Counts the amount of turns the player 
                      //has already expired and stops play when 
                      //the turn count reaches 24
{
  if (document.getElementsByClassName('flipped').length==2)
  {
    turns +=1;
    if (turns == 24)
    {
      var blocker = document.createElement('div');
      blocker.className= 'blocker';
      document.getElementsByTagName('body')[0].insertAdjacentElement('beforeEnd', blocker)
    }
    document.getElementById('turns').innerHTML = turns;
    console.log('Turn ',turns,' Completed');
    if(gameLogic() !=1)
    {
      flipCard(document.getElementsByClassName('flipped'));
    }
  }
}
      
function randomCardSelect()//Function to return 10 cards chosen from random, 
                           //and then duplicating these choices and shuffling 
                           //the array of twenty(20) cards that were selected, 
                           //then placing these cards in the inner HTML of the 
                           //cards front 
                           
{
  var random10 = [];
  var temp = []; // Holding array values during shuffling.
  for(var i=0;i<=9;i++)
  {
    random10[i] = cardpack[Math.floor(Math.random()*(cardpack.length-1))];
  }
  random10 =random10.concat(random10);//Duplicating the array on itself
  console.log('Unshuffled\n',random10);
  for(var j=0;i<=19;i++)
  {
    var random = Math.floor(Math.random()*(random10.length-1));
    var random2 = Math.floor(Math.random()*(random10.length-1));
    temp.push(random10.splice(random,1)[0]);                           //Removes random member from random10 and places in temp
    random10.push(temp[0]);                                            //Pushes the random member to the back of random10
    temp.splice(0,1);                                                  //Empties the Temp folder
  }
  console.log('Shuffled\n',random10);
  for(var i=0;i<=19;i++)                                               //Deploying random10's constituents into the back of the 
                                                                       //cards on the document.
  {
    if(random10[i].indexOf('C') > -1)
    {
      document.getElementsByClassName('back')[i].className += ' clubs';
      switch(random10[i][0])
      {
        case 'A':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "0px 0px";
          break;
        case '2':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-127px 0px";
          break;
        case '3':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-254px 0px";
          break;
        case '4':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-381px 0px";
          break;
        case '5':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-508px 0px";
          break;
        case '6':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-635px 0px";
          break;
        case '7':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-762px 0px";
          break;
        case '8':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-889px 0px";
          break;
        case '9':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1016px 0px";
          break;
        case '1':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1143px 0px";
          break;
        case 'J':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1270px 0px";
          break;
        case 'Q':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1397px 0px";
          break;
        case 'K':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1524px 0px";
          break;
        default:document.getElementsByClassName('back')[i].style.backgroundPosition = "0px 0px";
      }
    }
    else if (random10[i].indexOf('D') > -1)
    {
      document.getElementsByClassName('back')[i].className += ' diamonds';
      switch(random10[i][0])
      {
        case 'A':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "0px -525px";
          break;
        case '2':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-127px -525px";
          break;
        case '3':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-254px -525px";
          break;
        case '4':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-381px -525px";
          break;
        case '5':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-508px -525px";
          break;
        case '6':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-635px -525px";
          break;
        case '7':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-762px -525px";
          break;
        case '8':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-889px -525px";
          break;
        case '9':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1016px -525px";
          break;
        case '10':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1143px -525px";
          break;
        case 'J':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1270px -525px";
          break;
        case 'Q':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1397px -525px";
          break;
        case 'K':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1524px -525px";
          break;
        default:document.getElementsByClassName('back')[i].style.backgroundPosition = "0px 0px";
      }
    }  
    else if (random10[i].indexOf('S') > -1 )
    {
      document.getElementsByClassName('back')[i].className += ' spades';
      switch(random10[i][0])
      {
        case 'A':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "0px -175px";
          break;
        case '2':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-127px -175px";
          break;
        case '3':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-254px -175px";
          break;
        case '4':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-381px -175px";
          break;
        case '5':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-508px -175px";
          break;
        case '6':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-635px -175px";
          break;
        case '7':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-762px -175px";
          break;
        case '8':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-889px -175px";
          break;
        case '9':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1016px -175px";
          break;
        case '10':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1143px -175px";
          break;
        case 'J':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1270px -175px";
          break;
        case 'Q':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1397px -175px";
          break;
        case 'K':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1524px -175px";
          break;
        default:document.getElementsByClassName('back')[i].style.backgroundPosition = "0px 0px";
      }
    }  
    else if (random10[i].indexOf('H') > -1 )
    {
      document.getElementsByClassName('back')[i].className += ' hearts';
      switch(random10[i][0])
      {
        case 'A':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "0px -350px";
          break;
        case '2':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-127px -350px";
          break;
        case '3':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-254px -350px";
          break;
        case '4':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-381px -350px";
          break;
        case '5':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-508px -350px";
          break;
        case '6':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-635px -350px";
          break;
        case '7':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-762px -350px";
          break;
        case '8':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-889px -350px";
          break;
        case '9':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1016px -350px";
          break;
        case '10':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1143px -350px";
          break;
        case 'J':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1270px -350px";
          break;
        case 'Q':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1397px -350px";
          break;
        case 'K':
          document.getElementsByClassName('back')[i].style.backgroundPosition = "-1524px -350px";
          break;
        default:document.getElementsByClassName('back')[i].style.backgroundPosition = "0px 0px";
      }
    }  
 }
  
  
                       
}

function gameLogic()//Function to test compare the cards that have been flipped for identicality
{
  var c2bc = document.getElementsByClassName('card flipped');         //Array with the cards to be checked for indenticality
  if(c2bc[0].children[1].style.backgroundPosition == c2bc[1].children[1].style.backgroundPosition)
  {
    if(c2bc[1].className.indexOf('matched') == -1)
    {
      c2bc[1].className += ' matched';
      //trigger the Match sound here 
      match_audio.load();
      match_audio.play();
      c2bc[1].className = c2bc[1].className.replace(' flipped', ' flipped2');
    }
    if(c2bc[0].className.indexOf('matched') == -1)
    {
      c2bc[0].className += ' matched';
      c2bc[0].className = c2bc[0].className.replace(' flipped', ' flipped2');
    }
    return 1;
  }
  return 0;
}

function flipCard(cards) //This function triggers the flipped class 
                         //which in turn triggers the necessary 'flipped' 
                         //class to activate initiating a flip of the selected card
{
  
  if(cards!=null && cards.length != undefined)
  {
    window.setTimeout(function(){cards[1].className = cards[1].className.replace(' flipped','');
                                 cards[0].className = cards[0].className.replace(' flipped','');},500); //Triggers both card flips after an interval of 500 milliseconds 
    return;
  }
  if(this.className.indexOf('flipped') > -1)
  {
    if(this.className.indexOf('flipped2') >-1)
    {
      alert('Already Matched');
    }
    else
    {
      this.className = this.className.replace(' flipped','');
    }
  }
  else if(this.className.indexOf('matched')>-1)
  {
    return 'Already Matched';
  }
  else
  {
    this.className += ' flipped';
  }
  turnCounter();
}


function createCardPack() // Creates the deck of cards that the game will use.
{
  var faces = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  var suits = ['H','C','S','D'];
  var cardnum = 0;
  for(var i=0;i<=suits.length-1;i++)
    {
      for(var j=0;j<=faces.length-1;j++)
        {
          cardpack[cardnum] = faces[j] + suits[i];
          cardnum++;
        }
    }
  console.log(cardpack);
  
}



function gameStart()//Creates the physical cards within the Game Area.
{
  var gameArea = document.getElementById('gamearea');
  for(var i=0;i<=19;i++)
  {
    var flipArea = document.createElement('div');
    flipArea.className= 'flipArea';
    var card = document.createElement('div');
    card.className = 'card'
    var cardBack = document.createElement('div');
    var cardFront = document.createElement('div');
    cardBack.className= 'back face';
    cardFront.className = 'front';
    gameArea.insertAdjacentElement('afterBegin', flipArea);
    flipArea.insertAdjacentElement('afterBegin', card);
    card.insertAdjacentElement('afterBegin', cardBack);
    card.insertAdjacentElement('afterBegin', cardFront);
  }
  createCardPack();
  
  //Setting up the audio tag for match notification
  match_audio = document.createElement('audio');
  match_audio.id = 'matchAudio';
  match_audio.preload = 'auto';
  audio_source = document.createElement('source');
  audio_source.src = "/static/audio/magic-chime-02.mp3";
  audio_source.type = "audio/mpeg";
  match_audio.insertAdjacentElement('afterBegin', audio_source);
  //Audio setup End 
  
  
  var turnCounter = document.createElement('div');
  turnCounter.className = 'turnCounter';
  turnCounter.innerHTML = "Turns:<br/><span id='turns'>0</span>/24";
  
  //Save Button Implementation 
  var saveProg = document.createElement('div');
  saveProg.style
  
  
  
  document.getElementsByTagName('body')[0].insertAdjacentElement('beforeEnd',turnCounter);
  document.getElementsByTagName('body')[0].insertAdjacentElement('beforeEnd',match_audio);
  
}




