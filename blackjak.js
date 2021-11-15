document.getElementById('hitBtn').addEventListener('click',blackjakHit);

document.getElementById('standBtn').addEventListener('click',blakjakStand);

document.getElementById('delBtn').addEventListener('click',blackjakdeal);

let dataSet ={
    'you':{'scoreSpan':'#your-Score', 'score':0, 'mydiv':'#yourDiv' },
    'dealer':{'scoreSpan':'#dealers-score', 'score':0, 'mydiv':'#dealersDiv' },
    'card':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardScore':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'Q':10, 'J':10, 'A':[1,11]},
    'numOfWins':0,
    'numOfLoses':0,
    'numOfDrows':0,
    'standMod':false,
}

let you=dataSet['you'];
let dealer=dataSet['dealer'];
const hitsound=new Audio('sounds/swish.m4a');
const lostSound=new Audio('sounds/aww.mp3');
const winSound=new Audio('sounds/cash.mp3');

// console.log(dataSet['card'])

function blackjakHit(){
    if(dataSet['standMod']===false){
        let cardValue= randomNumber();
        scoreCount(cardValue,you);
        addCareds(cardValue,you);
        showScore(you)
        hitsound.play();
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function blakjakStand(){
    while(dealer['score']<17){
        let cardValue= randomNumber();
        scoreCount(cardValue,dealer);
        addCareds(cardValue,dealer);
        showScore(dealer)
        await sleep(500);
    }
    let massage=choseWinner();
    displaywinMassage(massage);
    dataSet['standMod']=true;
    
}

function blackjakdeal(){
    if(dataSet['standMod']===true){

        removeIteams();
        removeScores();
        updateTable();
        
    }
   dataSet['standMod']=false;
}

function randomNumber(){
    let num= Math.floor(Math.random()*13);
    let cardvalue=dataSet['card'][num];
    return cardvalue;

}

function addCareds(cardValue,player){
    if(player['score']<=21){
        let img= document.createElement('img');
        img.src=`images/${cardValue}.png`;
        img.style.width='100px';
        img.style.margin='10px';
        document.querySelector(player['mydiv']).appendChild(img);
    }
}

function scoreCount(values,player){
   if(values==='A'){
       if(player['score']+dataSet['cardScore'][values][1]<=21){
           player['score']=player['score']+dataSet['cardScore'][values][1];
       }
       else{
         player['score']=player['score']+dataSet['cardScore'][values][0];
       }
   }
   else{
    player['score']=player['score']+dataSet['cardScore'][values];
   }  
}

function showScore(player){
    if(player['score']<=21){
        document.querySelector(player['scoreSpan']).textContent=player['score'];
    }
    else{
        document.querySelector(player['scoreSpan']).textContent='BUST';
        document.querySelector(player['scoreSpan']).style.color='red';
    }
}

function removeIteams(){
    let yourimages=document.querySelector(you['mydiv']).querySelectorAll('img');
    let dealarimages=document.querySelector(dealer['mydiv']).querySelectorAll('img');

   for(let i=0;i<yourimages.length;i++){
       yourimages[i].remove();
   }

   for(let i=0;i<dealarimages.length;i++){
    dealarimages[i].remove();
   }
}

function removeScores(){
    you['score']=0;
    document.querySelector(you['scoreSpan']).textContent='0';
    document.querySelector(you['scoreSpan']).style.color='white';

    dealer['score']=0;
    document.querySelector(dealer['scoreSpan']).textContent='0';
    document.querySelector(dealer['scoreSpan']).style.color='white';

    document.getElementById('resulzShow').textContent=`let's play`;
    document.getElementById('resulzShow').style.color='black';
}

function choseWinner(){
    let winneris;
    // let yourScore=document.querySelector(you['scoreSpan']).textContent;
    // let dealaerScore=document.querySelector(dealer['scoreSpan']).textContent;

if(you['score']!=0 && dealer['score']!=0){

    if(you['score']>21 && dealer['score']>21){
        winneris={'massage':'you Drow the game', 'color':'blue'},
        dataSet['numOfDrows']++;
    }
    else if(you['score']>21){
        winneris={'massage':'you lost the game', 'color':'red'},
        dataSet['numOfLoses']++;
        lostSound.play()
    }
    else if(dealer['score']>21){
        winneris={'massage':'you Won the game', 'color':'green'},
        dataSet['numOfWins']++;
        winSound.play();

    }
    else{
        if(you['score']>dealer['score']){
            winneris={'massage':'you Won the game', 'color':'green'},
            dataSet['numOfWins']++;
            winSound.play();
           
        }
        else if(you['score']<dealer['score']){
            winneris={'massage':'you lost the game', 'color':'red'},
            dataSet['numOfLoses']++;
            lostSound.play()
        }
        else{
            winneris={'massage':'you Drow the game', 'color':'blue'},
            dataSet['numOfDrows']++;
        }
    }
}

    return winneris;
}

function displaywinMassage(massage){
    
    document.getElementById('resulzShow').textContent=massage['massage'];
    document.getElementById('resulzShow').style.color=massage['color'];
}

function updateTable(){
    document.getElementById('winNumber').textContent=dataSet['numOfWins'];

    document.getElementById('lostNumber').textContent=dataSet['numOfLoses'];

    document.getElementById('droeNumber').textContent=dataSet['numOfDrows'];
}