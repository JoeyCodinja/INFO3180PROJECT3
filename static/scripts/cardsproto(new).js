//Player class controls the Player Name and the players amount of turns

function Player()
{
  this.name;
  this.turns = 0;
  this.score = 0;
  this.updateTurn = function(){
                                this.turns += 1;
                              }
  this.setName = function(name){
                                 this.name = name;
                               }
}

//Cards class holds all the operations that can be done on the cards in the game
function Cards() 
{
  this.createCardPack = function(){
                                          var faces = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
                                          var suits = ['H','C','S','D'];
                                          var cardnum = 0;
                                          var cardpack = [];
                                          for(var i=0;i<=suits.length-1;i++)
                                          {
                                            for(var j=0;j<=faces.length-1;j++)
                                            {
                                              cardpack[cardnum] = faces[j] + suits[i];
                                              cardnum++;
                                            }
                                          }
                                          return cardpack
                                        } 
  this.randomCardSelect = function(){
                                      var random10 = [];
                                      var temp = [];
                                      for(i=0;i<=9;i++)
                                      {
                                        random10[i] = this.cardpack[Math.floor(Math.random()*(this.cardpack.length-1))];
                                      }
                                      random10=random10.concat(random10);//Duplicating the Array on itself
                                      for(var j=0;i<=19;i++)
                                      {
                                        var random = Math.floor(Math.random()*(random10.length-1));
                                        var random2 = Math.floor(Math.random()*(random10.length-1));
                                        temp.push(random10.splice(random,1)[0]);                           //Removes random member from random10 and places in temp
                                        random10.push(temp[0]);                                            //Pushes the random member to the back of random10
                                        temp.splice(0,1);                                                  //Empties the Temp array
                                      }
                                      return random10; 
                                    }
                                      
  this.cardpack = [];
  this.gameCards = [];
}

function GameState(gamemode)
{
  this.gamemode = gamemode;
  this.resumeGame = function(){}
}
GameState.GameMode = {ONEPLAYER: 1,
                      TWOPLAYER: 2};



var gameState;
var player1;
var player2; 
var activePlayer;    //Stores the information on the player that is to be active at that point in time.

document.observe('dom:loaded', function(){
                                            chooseGameMode();
                                          });


function chooseGameMode()//Enables the user to pick their type of play,
                         //Single Player Play(return value of 1), or Two Player Play(return value of 2) 
{
  //Game Mode Choice 
  var toastbox = new Element('div', {'id':'gameModeContainer'});
  var choice1 = new Element('div', {'class':'playChoice'});
  var choice2 = new Element('div', {'class':'playChoice'});
  var nameinputform = new Element('form', {'class':'PLAYERONENAMEINPUT', 'onsubmit':'return acceptName(this)'});
  
  toastbox.style.zIndex='1000';
  
  choice1.innerHTML = '1 PLAYER';
  choice1.onclick = function(){
                               this.style.backgroundColor = 'black';
                               this.style.color='white';
                               window.setTimeout(function(){$$('.playChoice')[0].style.backgroundColor ='white';
                                                            $$('.playChoice')[0].style.color ='black'}, 200);
                               toastbox.style.opacity = 1;
                               toastbox.style.width = "200px";
                               toastbox.style.fontFamily = "Tower_Ruins";
                               toastbox.style.margin = "auto";
                               gameState = new GameState(GameState.GameMode.ONEPLAYER);
                               player1 = new Player();
                               $$('.playChoice')[1].remove(); 
                               $$('.playChoice')[0].remove();
                               nameinputform.insert({top:new Element('input',{'type':'text','name':'Player1Name'}) , bottom:new Element('input',{'type':'submit', 'value':'Set'})});
                               nameinputform.childElements()[0].insert({before:new Element('label',{})});
                               nameinputform.childElements()[0].innerHTML = "Player 1 Name";
                               toastbox.insert(nameinputform);
                               window.setTimeout(function(){gameStart(gameState),300});
                              }
                                                              
  choice2.innerHTML = '2 PLAYER';
  choice2.onclick = function(){
                                this.style.backgroundColor ='black';
                                this.style.color='white';
                                window.setTimeout(function(){$$('.playChoice')[1].style.backgroundColor ='white';
                                                             $$('.playChoice')[1].style.color = 'black';}, 200);
                                toastbox.style.opacity = 1;
                                toastbox.style.width = "200px";
                                toastbox.style.fontFamily = "Tower_Ruins";
                                toastbox.style.margin = "auto";
                                gameState = new GameState(GameState.GameMode.TWOPLAYER);
                                player1 = new Player();
                                player2 = new Player();
                                activePlayer = player1;
                                $$('.playChoice')[1].remove();
                                $$('.playChoice')[0].remove();
                                nameinputform.insert({bottom:new Element('label',{})});
                                nameinputform.childElements()[0].innerHTML= 'Player 1 Name' ;
                                nameinputform.insert({bottom:new Element('input',{'type':'text','name':'Player1Name'})});
                                nameinputform.insert({bottom:new Element('label',{})});
                                nameinputform.childElements()[2].innerHTML= 'Player 2 Name';  
                                nameinputform.insert({bottom:new Element('input',{'type':'text','name':'Player2Name'})});
                                nameinputform.insert({bottom:new Element('input',{'type':'submit'})});
                                toastbox.insert(nameinputform);
                                 
                                window.setTimeout(function(){gameStart(gameState),300});
                              }
  
  toastbox.insert({top:choice1, bottom:choice2 });
  $('gamearea').insert({bottom:toastbox});
}

function gameStart(gameMode)
{
  var gameArea = $('gamearea');
  var cardsClass;
    for(var i=0;i<=19;i++)
    {
      var flipArea = new Element('div',{'class':'flipArea'});
      var card = new Element('div',{'class':'card'});
      var cardBack = new Element('div', {'class':'back face'});
      var cardFront = new Element('div', {'class':'front'});
      gameArea.insert({top:flipArea});
      flipArea.insert({top:card});
      card.insert({top:cardBack, bottom:cardFront});
    }
    cardsClass = new Cards();
    cardsClass.cardpack = cardsClass.createCardPack();
    //createCardPack();
  
    //Setting up the audio tag for match notification 
    
  var flip_audio = new Element('audio',{'id':'flipAudio', 'preload':'auto'});
  var audio_source2 = new Element('source',{'src':'/static/audio/page-flip-02.mp3', 'type':'audio/mpeg'});
  var body = $$('body')[0];
   
  var gameDetails  = new Element('div', {'class':'gameDetails'});
  var savebtn = new Element('div',{'id':'saveBtn', 'title':'Saves your current game progress'});
  var resetbtn = new Element('div',{'id':'resetBtn', 'title':'Resets the save file that was set'});
  var playerNameSubmit = new Element('input', {'type':'submit', 'value':'Set'});
  var a_p_Name = new Element('input',{'type':'text', 'name':'player1'}); //this is the element that would actually accept the players name 
  var label1 = new Element('label',{});
  
  gameDetails.width = '225px';
    
  label1.innerHTML = 'Player Name';
  
    
  savebtn.innerHTML = 'save';
  savebtn.style.fontFamily = 'Tower_Ruins, Berlin Sans ';
  savebtn.style.top = '20px';  
    
  
  resetbtn.innerHTML = 'reset';
  resetbtn.style.fontFamily = 'Tower_Ruins, Berlin Sans';
  resetbtn.style.top = '30px';
  
    
  match_audio = new Element('audio',{'id':'matchAudio', 'preload':'auto'});
  audio_source = new Element('source',{'src':'/static/audio/magic-chime-02.mp3', 'type':'audio/mpeg'});
  match_audio.insert({top:audio_source});
  body.insert({bottom:match_audio});
  
  body.insert({bottom:flip_audio});
  flip_audio.insert({top:audio_source2});
 
  gameDetails.innerHTML = "turns:<br/><span id='turns'>0</span>/24";
  if(gameMode.gamemode == GameState.GameMode.ONEPLAYER)
    {
      gameDetails.insert({bottom:savebtn});
      gameDetails.insert({bottom:resetbtn});
      body.insert({bottom:gameDetails});
      $('saveBtn').onclick = function(){var btn =$('saveBtn');
                                    btn.style.backgroundColor = 'black';
                                    window.setTimeout(function(){$('saveBtn').style.backgroundColor ='white'}, 200);
                                    saveGame(cardsClass);
                                   }
      $('resetBtn').onclick = function(){var btn = $('resetBtn');
                                    btn.style.backgroundColor ='black';
                                    window.setTimeout(function(){$('resetBtn').style.backgroundColor ='white'}, 200);
                                    $.jStorage.flush();
                                    alert('Saved Game Data Erased');
                                    console.log('LocalStorage flushed');
                                    }
    }
    
  if($.jStorage.index().length != 0 && resumeGame() != 1)
  {
    if(resumeGame(cardsClass) === 2)
    {
      alert('Resume Successful');
    }
    else
    {
      cardsClass.gameCards = cardsClass.randomCardSelect();
      cardPlacement(cardsClass.gameCards);
    }
  }
  else
  {
    cardsClass.gameCards = cardsClass.randomCardSelect();
    cardPlacement(cardsClass.gameCards);
  }
  var cards = $$('.card');
  for(var i=0;i<=cards.length-1;i++)
      {
        cards[i].onclick = flipCard;
      }
  if (gameMode.gamemode == GameState.GameMode.TWOPLAYER )  
  {
    //Player names shown on the right hand side 
    //Highlighter for current player turn 
    var PlayerHighlighter = new Element('div',{'id':'PlayerHighlighter'});
    $$('body')[0].insert({bottom:gameDetails});
    $$('body')[0].insert({bottom:PlayerHighlighter});
 
  }
}

function saveGame(cards) /*Creates local storage to store the 
                           progress of the player as well as an associated name*/
{
  var matchedCardPositions = [];
  if (gameState.gamemode == GameState.GameMode.ONEPLAYER)
  {
    $.jStorage.set('gameCards',JSON.stringify(cards.gameCards)); /*Storing the selected cards in
                                   the order that they appear */
    $.jStorage.set('CTurns', JSON.stringify(player1.turns));
  
    /*Pull list of cards from the field and get 
      the indexes of the cards that have been
      matched as pairs*/
    var cardsInPlay = $$('.card');
    for(var i=0;i<=cardsInPlay.length-1;i++)
    {
      if(cardsInPlay[i].className.indexOf('flipped2')>-1)
      {
        matchedCardPositions.push(i);
      }
    }
    if(matchedCardPositions != null)
    {
      matchedCardPositions = JSON.stringify(matchedCardPositions);
      $.jStorage.set('matchedCardsPos', matchedCardPositions);
    }
  
    //Get the values for the amount of cards matched 
    alert('Progress Saved');
  }
  
  if(gameState.gamemode == GameState.GameMode.TWOPLAYER)
  {
    
  }
}

function resumeGame(cardsInPlay) /*Resumes the game from the state that it was 
                      in when last saved using localStorage. it takes the parameter cards in play which is the card configuration that was started in gameStart*/
{
  var gameState = [];
  var currentCards; 
  //Checks if there are localStorage keys to get gamedata from 
  if($.jStorage.index()!= 0)
  {
    if($.jStorage.get('gameCards',"Key retrieve Error")!="Key retrieve Error" && $.jStorage.get('gameCards') != null)
    {
      cardsInPlay.gameCards = JSON.parse($.jStorage.get('gameCards'));
      //gameState.push($.jStorage.get('gameCards',"Key retrieve Error"));
      //gameState[0] = JSON.parse(gameState[0]);                           //gets the gameCards config from the previous game 
      currentCards = $$('.card'); //Get the cards current game that is loaded
      cardPlacement(cardsInPlay.gameCards);
    }
    else
    {
      console.log("Game State Retrieve Error (1)");
      $.jStorage.flush(); //Flush the Applicaton Storage of our error 
      return 1; // Error resuming game state so new game is started.
    }
    
    if($.jStorage.index().indexOf('matchedCardsPos')>-1 && $.jStorage.get('matchedCardsPos') != null)
     {
         gameState.push(JSON.parse($.jStorage.get('matchedCardsPos')));
         player1.score = gameState[0].length/2;                       
         for(var i=0;i<=gameState[0].length-1;i++)
         {
            currentCards[gameState[0][i]].className += ' matched flipped2'; /*Adds the matched and flipped classes
                                                                          to show the cards that were flipped 
                                                                          saved game.*/
         }
     }
       
    if($.jStorage.index().indexOf('CTurns')>-1 && $.jStorage.get('CTurns') != null)
    {
      player1.turns = parseInt(JSON.parse($.jStorage.get('CTurns')));
      $('turns').innerHTML = player1.turns;
    }
    if($.jStorage.index().indexOf('playerName')>-1)
    {
      $$('form')[0].replace($.jStorage.get('playerName')+"<br><br>");
    }
      return 2; // Resume Sucess!!
  }
  else
  {
    return 1; //Indicates that this is a totally new game that is being started
  }
}

function cardPlacement(cards) // cardPlacement takes the cards that are listed in the Card.gameCards list and deals with them accordingly
{
  for(var i=0;i<=cards.length-1;i++)
  {
      if(cards[i].indexOf('C')>-1)
      {
        $$('.back')[i].className += ' clubs';
      }
      else if(cards[i].indexOf('D')>-1)
      {
        $$('.back')[i].className += ' diamonds';
      }
      else if(cards[i].indexOf('H')>-1)
      {
        $$('.back')[i].className += ' hearts';
      }
      else if(cards[i].indexOf('S')>-1)
      {
        $$('.back')[i].className += ' spades';
      }
      suitSelect(cards[i], i);
  }
}

function suitSelect(card, i)
{
  if(card.indexOf('C')>-1)
  {
    switch(card[0])
    {
      case 'A':
          $$('.back')[i].style.backgroundPosition = "0px 0px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px 0px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px 0px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px 0px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px 0px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px 0px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px 0px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px 0px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px 0px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px 0px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px 0px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px 0px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px 0px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
  if(card.indexOf('D')>-1)
  {
    switch(card[0])
    {
        case 'A':
          $$('.back')[i].style.backgroundPosition = "0px -525px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px -525px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px -525px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px -525px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px -525px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px -525px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px -525px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px -525px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px -525px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px -525px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px -525px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px -525px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px -525px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
  if(card.indexOf('H')>-1)
  {
    switch(card[0])
    {
       case 'A':
          $$('.back')[i].style.backgroundPosition = "0px -350px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px -350px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px -350px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px -350px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px -350px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px -350px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px -350px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px -350px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px -350px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px -350px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px -350px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px -350px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px -350px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
  if(card.indexOf('S')>-1)
  {
    switch(card[0])
    {
       case 'A':
          $$('.back')[i].style.backgroundPosition = "0px -175px";
          break;
        case '2':
          $$('.back')[i].style.backgroundPosition = "-127px -175px";
          break;
        case '3':
          $$('.back')[i].style.backgroundPosition = "-254px -175px";
          break;
        case '4':
          $$('.back')[i].style.backgroundPosition = "-381px -175px";
          break;
        case '5':
          $$('.back')[i].style.backgroundPosition = "-508px -175px";
          break;
        case '6':
          $$('.back')[i].style.backgroundPosition = "-635px -175px";
          break;
        case '7':
          $$('.back')[i].style.backgroundPosition = "-762px -175px";
          break;
        case '8':
          $$('.back')[i].style.backgroundPosition = "-889px -175px";
          break;
        case '9':
          $$('.back')[i].style.backgroundPosition = "-1016px -175px";
          break;
        case '1':
          $$('.back')[i].style.backgroundPosition = "-1143px -175px";
          break;
        case 'J':
          $$('.back')[i].style.backgroundPosition = "-1270px -175px";
          break;
        case 'Q':
          $$('.back')[i].style.backgroundPosition = "-1397px -175px";
          break;
        case 'K':
          $$('.back')[i].style.backgroundPosition = "-1524px -175px";
          break;
        default:$$('.back')[i].style.backgroundPosition = "0px 0px";
    }
  }
}


function flipCard(cards)
{
  if(cards.length===2)
  {
    //Triggers both card flips after an interval of 500 milliseconds
    window.setTimeout(function(){cards[1].className =cards[1].className.replace(' flipped' ,'');
                                 cards[0].className =cards[0].className.replace(' flipped','');},500);
    return;
  }
    
    if(this!=undefined && this.className.indexOf('flipped')>-1)
      {
        if(this.className.indexOf('flipped2')>-1)
          {
            alert('Already Matched');
          }
        else
          {
            this.className = this.className.replace(' flipped','');
          }
      }
  else
  {
    this.className += ' flipped';
    $('flipAudio').load();
    $('flipAudio').play();
  }
    turnCounter();
}

function acceptName(names)/*Accepts and binds the name that has been 
                       placed in the form that will be placed 
                       above the turn counter*/
{
 if(names!=null && gameState.gamemode == GameState.GameMode.ONEPLAYER)
 {
   player1.setName($F(names['Player1Name']));
   $.jStorage.set('playerName', player1.name);
   $$('.gameDetails')[0].insert({top:player1.name+"<br><br>"});
   $('gameModeContainer').remove();
   return false;
 }
 else if (names!=null && gameState.gamemode == GameState.GameMode.TWOPLAYER)
 {
   //Verifying that we are in 2 Player Mode
   var name = [];
   player1.setName($F(names['Player1Name']));
   player2.setName($F(names['Player2Name']));
   $.jStorage.set('player1Name', player1.name);
   $.jStorage.set('player2Name', player2.name);
   $('gameModeContainer').remove();
   $("PlayerHighlighter").insert({top:"Player1<br>"+ player1.name+"<br>"+"Turns:<br><span id='Player1Turns'>"+player1.turns+"</span>/24"});
   $("PlayerHighlighter").insert({bottom:"<br>"});
   $("PlayerHighlighter").insert({bottom:"Player2<br>"+ player2.name+"<br>"+"Turns:<br><span id='Player2Turns'>"+player2.turns+"</span>/24" });
   return false;
 }
 else
 {
   console.log('Error occured');
   return false;
 }
} 


function turnCounter()/*Counts the amount of turns the player has
                        already expired during their game and stops 
                        the game when the amount of turns eq*/
{
  if (gameState.gamemode == GameState.GameMode.ONEPLAYER)
  {    
    if($$('.flipped').length==2)
    {
      player1.updateTurn();
      $('turns').innerHTML = player1.turns.toString();
      if(player1.turns==24)
      {
        $$('body')[0].insert({bottom:new Element('div',{'class':'blocker'})});
        alert("Seems you have lost .. too bad :(");
      }
      console.log('Turns',player1.turns,'completed');
      if(gameLogic()!=-1)
      {
        flipCard($$('.flipped'));
      }
    }
  }
  else if (gameState.gamemode == GameState.GameMode.TWOPLAYER)
  {
    if (activePlayer.turns == 24 || $$('.flipped2').length == 20)
    {
      if(activePlayer == player1)
      {
        if(activePlayer.score == player2.score)
        {
          alert("Seems we have a tie");
        }
        else if (activePlayer.score > player2.score)
        {
          alert(activePlayer.name + " has won the game!");
        }
        else if(activePlayer.score < player2.score)
        {
          alert(player2.name + " has lost the game!");
        }
      }
      else if(activePlayer== player2)
      {
        if(activePlayer.score == player1.score)
        {
          alert("Seems we have a tie"); 
        }
        else if(activePlayer.score > player1.score)
        {
          alert(activePlayer.name +" has won the game!");
        }
        else if(activePlayer.score < player1.score)
        {
          alert(player1.name +" has won the game!");
        }
      }
      $$('body')[0].insert({bottom:new Element('div', {'class':'blocker'})});
    }
    if($$('.flipped').length==2)
    {
      activePlayer.updateTurn();
      console.log(activePlayer.name+' has completed '+activePlayer.turns+' turns');
      if(activePlayer == player1)
      {
        $('Player1Turns').innerHTML = activePlayer.turns
        activePlayer = player2;
      }
      else if (activePlayer == player2)
      {
        $('Player2Turns').innerHTML = activePlayer.turns;
        activePlayer = player1;
      }
      console.log(activePlayer.name+"'s turn");
      if(gameLogic()!=-1)
      {
        flipCard($$('.flipped'));
      }
    }
  }
}


function gameLogic() /*Contains the code that manages 
                       the matching logic of the game */
{
  var c2bc = $$('.flipped');    //Cards to be checked(Same)
  var cardsMatched = $$('flipped2');
  if(c2bc[1].childElements()[0].style.backgroundPosition == c2bc[0].childElements()[0].style.backgroundPosition)
    {
      if(c2bc[1].className.indexOf('matched') == -1)
        {
          c2bc[1].className += ' matched';
          if(gameState.gamemode == GameState.GameMode.ONEPLAYER)
          {
            player1.score  +=1;
          }
          else if(gameState.gamemode == GameState.GameMode.TWOPLAYER)
          {
            if (activePlayer == player1)
            {
              player2.score +=1;
            }
            else if(activePlayer == player2)
            {
              player1.score +=1;
            }
              
          }
          //trigger the Match sound here 
          match_audio.load();
          match_audio.play();
          c2bc[1].className = c2bc[1].className.replace(' flipped',' flipped2'); // 'flipped2' is a marker to show that the card is flipped bu the card is matched 
        }
      if(c2bc[0].className.indexOf('matched') == -1)
        {
          c2bc[0].className += ' matched';
          c2bc[0].className = c2bc[0].className.replace(' flipped', ' flipped2');
        }
    }
}
