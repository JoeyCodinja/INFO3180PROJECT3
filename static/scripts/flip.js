'use strict'

window.onload = function()
{
  document.getElementsByClassName('card')[0].onclick = flipCard;
  createTestCard();
  addPlaceHolders();
}

function flipCard()
{
  if(this.className.indexOf('flipped') > -1)
  {
    this.className = this.className.replace(' flipped','');
  }
  else
  {
    this.className += ' flipped';
  }
}    
function createTestCard()
{
  var flipArea = document.createElement('div');
    flipArea.className = 'container';
    flipArea.style.left = '300px';
  var card = document.createElement('div');
    card.className = 'card'; 
    card.onclick = flipCard;
  var back = document.createElement('div');
    back.className = 'back';
  var front = document.createElement('div');
    front.className = 'front2';
  document.getElementsByTagName('body')[0].insertAdjacentElement('beforeEnd',flipArea);
  flipArea.insertAdjacentElement('beforeEnd',card);
  card.insertAdjacentElement('beforeEnd',front);
  card.insertAdjacentElement('beforeEnd',back); 
}
  


function addPlaceHolders()  //Function to add Placeholders for the card faces that will be rendered
{
  alert('addPlaceHolders:Function Under Dev');
  var card = document.getElementsByClassName('front2')[0];
  for(var inc =0; inc<=13; inc++)
  {
    var symbolPlaceHolder = document.createElement('div');
    symbolPlaceHolder.id = 'sPh'+inc;
    symbolPlaceHolder.style.height = "20px";
    symbolPlaceHolder.style.width = "20px";
    symbolPlaceHolder.style.border = "2px solid grey";
    card.insertAdjacentElement('beforeEnd',symbolPlaceHolder);
  }
}
