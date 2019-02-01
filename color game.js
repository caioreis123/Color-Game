let squares = document.querySelectorAll(".square");
let numSquares = 6;
let colorsArray = generateColorsArray(numSquares);
let h1 = document.querySelector("h1");
let rightColor = colorPicker(colorsArray);
let displayColor = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let resetButton = document.querySelector("#reset");
let easyButton = document.querySelector(".easyBtn");
let hardButton = document.querySelector(".hardBtn");

easyButton.addEventListener("click", function(){
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    //the easy button is not going to run if it is already selected
    if (numSquares === 3){}
    else{             
        // setting number of squares
        numSquares = 3;
        resetAll();       
    }
})


hardButton.addEventListener("click", ()=>{      /*same structure as the above, but using arrow function instead the anonymous one*/
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
    //the hard button is not going to run if is already selected
    if (numSquares === 6){}
    else{
        // setting number of squares
        numSquares = 6
        resetAll();
    }
})

resetButton.addEventListener("click", function(){
    resetAll();   
})

init();

function init(){
    setUpSquares();
    resetAll();
}

//add initial colors to squares
function setUpSquares(){
    for (let i = 0; i < squares.length; i++){    
        //set the clicked squares events in case of win or loose
        squares[i].addEventListener("click", function(){
            //grab the clicked color
            let clickedColor = this.style.backgroundColor
            //compare the clicked color with the right one
            if (clickedColor === rightColor) {        
            //events in case of right guess    
                messageDisplay.textContent = "You got it right!!"            
                //make all squares the right color
                for (let i = 0; i < squares.length; i++){
                    squares[i].style.backgroundColor = rightColor;
                }
                h1.style.backgroundColor = rightColor;
                resetButton.textContent = "PLAY AGAIN?"
            } 
            //events in case of wrong guess
            else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again"
            }
        })
    }
}

//this resetAll function is called by the easy, hard and reset buttons when clicked
function resetAll (){
     //generate all new colors
     colorsArray = generateColorsArray(numSquares);
     //choose the right one to be guessed
     rightColor = colorPicker(colorsArray);
     //change the text display with the rgb code of the right color
     displayColor.textContent = rightColor;
     //change the h1 background to default color
     h1.style.backgroundColor = "steelblue";
     //erase the win or loose message
     messageDisplay.textContent = "";
     //change the text of the reset button to "new colors"
     resetButton.textContent = "NEW COLORS"
     //paint the squares and hide them when necessary
     for (let i = 0; i < squares.length; i++){
        if(colorsArray[i]){
            squares[i].style.display = "block"
            squares[i].style.backgroundColor = colorsArray[i];
        } 
        else {
            squares[i].style.display = "none"    
        }
    }
}

//this function will choose the right color in the colorsArray. The objective of the game is to select this color
function colorPicker (someArray) {
    return someArray[Math.floor(Math.random() * someArray.length)]
}

//this function will make the array with the colors that will compose the color grid
//totalOfColors is the number of colors that will be generated and put in the array
function generateColorsArray(totalOfColors){
    // make an empty array
    let arr = [];
    //put random colors in the array
    for (let i = 0; i < totalOfColors; i++){
        arr.push(randomColor())
    }
    //return the filled array
    return arr;
}

//this function is inside the previous one and will just generate random colors
function randomColor(){
    //random number for red from 0 to 255
    let red = Math.floor (Math.random() * 256);
    //random number for green from 0 to 255
    let green = Math.floor (Math.random() * 256);
    //random number for blue from 0 to 255
    let blue = Math.floor (Math.random() * 256);

    return "rgb(" + red + ", " + green + ", " + blue + ")";
}