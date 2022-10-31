//do all this after the DOM loads
document.addEventListener('DOMContentLoaded', (event) => {
    //declaring all html elements as constants
    
    const fruitInput = document.getElementById('fruitInput');
    const timer = document.getElementById('timer');
    const feedback = document.getElementById('feedbackDisplay');
    const fruitDisplay = document.getElementById('fruitDisplay');

    //declaring this one as a variable because it cha
    //var pointDisplay = document.getElementById('pointDisplay');

    const fruitList = [
        'apple', 'tomato', 'pineapple', 'pear', 
        'peach', 'plum', 'rhubarb', 'pomegranate', 
        'blueberry', 'banana', 'kiwi', 'prickly pear',
        'star fruit', 'orange', 'lemon', 'lime',
        'grapefruit', 'tangerine', 'blackberry', 'cherry',
        'mango', 'passionfruit',
    ];
    //making a new array using a spread for each round
    var gameFruits = [...fruitList];
    //starting points at 0 and time elapsed at 15
    var points = 0;
    var timeElapsed = 15;
    var timerStarted = false;
    //using getFruit function to pick a random fruit then display it
    var fruit = getFruit();
    fruitDisplay.innerHTML = fruit;
   
    
   //using event listener to initialize event when 'keyup'
    document.addEventListener('keypress', (event) => {
        //if the input is not empty, check for (1)if the timer started and (2) if the input matches fruitDisplay
        //if the timer is not 
        if(fruitInput.value != ''){
            //if the timer is not started, do this ->
            if(!timerStarted){
                resetGame();
                startTimer();
                timerStarted = true;
            }
            //if the text input is the same as the selected fruit, do this ->
            if(fruitInput.value.toLowerCase() === fruit){ //toLowerCase normalizes the input to match our data
                points++;
                pointDisplay = document.getElementById('pointDisplay' + points); //string concatenation (combination) in order to dynamically access our display fields
                pointDisplay.innerHTML = fruit;
                //removes the selected fruit from the array of possible fruits for this round of the game
                gameFruits.splice(gameFruits.indexOf(fruit), 1); //array.splice(starting index, number of elements to remove
                fruitInput.value = ''; //resets the input text box
                fruit = getFruit();
                fruitDisplay.innerHTML = fruit;
            }
        }
    });

    //starts our countdown
    function startTimer(){
        timeElapsed = 15;
        timer.innerHTML = timeElapsed;
        var interval = setInterval(() => {//we need the interval key ID in order to stop the timer, so we store it as a variable
            //decrement
            timeElapsed--;
            timer.innerHTML = timeElapsed;

            //if we run out of time, do this ->
            if(timeElapsed <= 0){
                clearInterval(interval);//stops the timer, using the key ID we got earlier
                feedback.innerHTML = 'You ran out of time. Please try again!';
                timerStarted = false;//the timer is not on, so we set this to false
            }
            //if we have 5 points, do this ->
            if(points >= 5){
                clearInterval(interval);
                feedback.innerHTML = 'You did it! Congratulations!';
                timerStarted = false;
            }
        }, 1000);
    }

    function resetGame(){
        for(let i=1; i <= 5; i++){//resets the pointDisplay fields
            document.getElementById('pointDisplay' + i).innerHTML = '';
        }
        feedback.innerHTML = ''; //resets the win/lose field
        gameFruits = [...fruitList]; //resets our list of possible fruits
        points = 0;
        //any code for resetting koala graphics would go here
    }

    //randomly generates a fruit from the list
    function getFruit(){
        //Math.random is a random decimal from 0 to 1. 
        //Multiply by maximum value (in this case our length), and round down to the nearest integer to generate an index to pull from.
        return gameFruits[Math.round(Math.random() * gameFruits.length)];
    }
});
