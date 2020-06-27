//include icons from FONTAWESOME
//include alerts from SWEETALERT2
//include animations from ANIMATE STYLE
//make title glow with JQUERY


let boardState = 0; //0 = no errors, 1 = there are errors
let boardArr = [];

for (let i = 0 ; i < 9 ; i++) {
    boardArr.push([]);
    for (let j = 0 ; j < 9 ; j++) {
        boardArr[i].push('');
    }
}



//---------------------------------------- CREATING UI BOARD ----------------------------------------



let table = document.querySelector('table');

for (let i = 0 ; i < 9 ; i++) {
    let newRow = document.createElement('tr');
    for (let j = 0 ; j < 9 ; j++) {
        let newCell = document.createElement('td');
        let newInput = document.createElement('input');
        newCell.appendChild(newInput);
        newCell.style = 'text-align: center; padding: 0;'
        newInput.type = 'text';
        newInput.maxLength = 1;
        newInput.setAttribute("onfocus", "this.select();"); //did not work with newInput.onfocus ??
        newInput.oninput = function() {
            if (!this.value.match(/[0-9]/g)) this.value = '';
        }
        newInput.style = 'height: 50px; width: 50px; border: 1px solid black; outline: none; font-size: 24px; text-align: center; font-weight: 700;';
                newRow.appendChild(newCell);
    }
    table.appendChild(newRow);
}



//giving the large inner boxes a border

let boxes = document.querySelectorAll('input');

for (let i = 18 ; i < 27 ; i++) {
    boxes[i].style.borderBottom = '5px solid black';
}
for (let i = 45 ; i < 54 ; i++) {
    boxes[i].style.borderBottom = '5px solid black';
}
for (let i = 2 ; i < 75 ; i+=9) {
    boxes[i].style.borderRight = '5px solid black';
}
for (let i = 5 ; i < 78 ; i+=9) {
    boxes[i].style.borderRight = '5px solid black';
}


//updating boardArr when user inputs numbers

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('change', function() {
        boardArr[Math.floor(i/9)][i%9] = boxes[i].value;
    });
}




//---------------------------------------- POPULATING BOARD ----------------------------------------



let gameDifficulty = 'easy';

let boardLayouts = {
    'empty': [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '']
    ],
    'easy': [
        ['', '', '', '2', '', '1', '8', '4', ''],
        ['', '8', '', '', '3', '', '', '', ''],
        ['2', '', '9', '', '', '6', '', '3', '5'],
        ['', '', '3', '', '5', '4', '', '9', ''],
        ['', '', '8', '1', '', '3', '4', '', ''],
        ['', '7', '', '8', '6', '', '1', '', ''],
        ['8', '4', '', '9', '', '', '3', '', '2'],
        ['', '', '', '', '7', '', '', '8', ''],
        ['', '6', '2', '3', '', '8', '', '', '']
    ],
    'medium': [
        ['', '2', '', '6', '', '8', '', '', ''],
        ['5', '8', '', '', '', '9', '7', '', ''],
        ['', '', '', '', '4', '', '', '', ''],
        ['3', '7', '', '', '', '', '5', '', ''],
        ['6', '', '', '', '', '', '', '', '4'],
        ['', '', '8', '', '', '', '', '1', '3'],
        ['', '', '', '', '2', '', '', '', ''],
        ['', '', '9', '8', '', '', '', '3', '6'],
        ['', '', '', '3', '', '6', '', '9', '']
    ],
    'hard': [
        ['', '1', '', '', '8', '', '', '', ''],
        ['', '', '2', '4', '', '', '9', '', ''],
        ['', '', '8', '6', '', '', '', '', '7'],
        ['2', '7', '', '', '', '', '', '1', ''],
        ['', '4', '1', '', '5', '', '7', '2', ''],
        ['', '8', '', '', '', '', '', '6', '9'],
        ['4', '', '', '', '', '5', '2', '', ''],
        ['', '', '6', '', '', '9', '3', '', ''],
        ['', '', '', '', '4', '', '', '9', '']
    ]
}



function populateBoard() {
    for (let i = 0; i < boardArr.flat().length; i++) {
        boxes[i].value = boardArr.flat()[i];
    }
}



function greyBoxes() {
    for (let i = 0; i < boardArr.flat().length; i++) {
        boxes[i].disabled = false;
        if (boardArr.flat()[i] !== '') {
            // boxes[i].style.backgroundColor = 'grey';
            boxes[i].disabled = true;
            boxes[i].style.fontWeight = 700;
            boxes[i].style.color = 'black';
        }
    }
}



//---------------------------------------- BUTTON SELECTORS ----------------------------------------



$("document").ready(function() { //onload, allow user to choose difficulty
    
    const inputOptions = {
        'easy': 'Easy',
        'medium': 'Medium',
        'hard': 'Hard',
        'empty': 'Custom'
    }
      
    const { value: color } = Swal.fire({
        title: 'Select difficulty',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (value) {
                gameDifficulty = value;
                boardArr = JSON.parse(JSON.stringify(boardLayouts[gameDifficulty]));
                populateBoard();
                greyBoxes();
            }
            else {
                return 'You need to choose something!'
            }
        }
    })

});



let newButton = document.getElementById('difficulty'),
    checkButton = document.getElementById('check'),
    solveButton = document.getElementById('solve'),
    resetButton = document.getElementById('reset');



newButton.addEventListener('click', function() {
    const inputOptions = {
        'easy': 'Easy',
        'medium': 'Medium',
        'hard': 'Hard',
        'empty': 'Custom'
    }
      
    const { value: color } = Swal.fire({
        title: 'Select difficulty',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (value) {
                gameDifficulty = value;
                boardArr = JSON.parse(JSON.stringify(boardLayouts[gameDifficulty]));
                populateBoard();
                greyBoxes();
            }
            else {
                return 'You need to choose something!'
            }
        }
    });
});



let modal = document.getElementById("modal__win"); //modal for winning screen

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});



checkButton.addEventListener('click', function() {   
    boardState = 0;
    checkRows();
    checkCols();
    checkLargeBox();

    if (boardState == 1) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `You've got a mistake somewhere.`,
            showConfirmButton: false,
            timer: 1200
        })
    }
    else if (boardState == 0 && boardArr.flat().map(x => (/\d/).test(x)).filter(x => x == true).length == 81) { //feels needlessly complicated; alternatively, i could change '' to '.' so that i can use a short includes()
        modal.style.display = 'block';
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'All good!',
            showConfirmButton: false,
            timer: 900
        })
    }
});



resetButton.addEventListener('click', function() {
    Swal.fire({
        title: 'Are you sure?',
        text: "This will reset the board to its original state",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
        })
        .then((result) => {
            if (result.isConfirmed) {
                boardArr = JSON.parse(JSON.stringify(boardLayouts[gameDifficulty]));
                populateBoard();
                greyBoxes();
            }
        });
});



solveButton.addEventListener('click', function() {
    boardState = 0;
    checkRows();
    checkCols();
    checkLargeBox();
    if (boardState == 0) {
        Swal.fire({
            title: 'Giving up already?',
            text: "This will show you the completed board",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'End it'
            })
            .then((result) => {
                if (result.isConfirmed) {
                    solve();
                    populateBoard();
                }
            }); 
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Please make sure there are no errors on the board first!`,
            showConfirmButton: false,
            timer: 1500
        })
    }
      
});



//---------------------------------------- BOARD VERIFICATION ----------------------------------------



//improve/combine functions; too much repetition

function checkRows() {
    for (let i = 0; i < 9; i++) {
        let arr = boardArr[i].filter(x => x.toString().match(/\d/)); 
        if (arr.length != new Set(arr).size) {
            boardState = 1;
            //console.log('wrong');
        }
    }
}



function checkCols() {
    let columns = [];
    for (let i = 0; i < 9; i++) {
        let tempArr = [];
        for (let j = 0 ; j < 9; j++) {
            tempArr.push(boardArr[j][i]);
        }
        columns.push(tempArr);    
    }

    for (let i = 0; i < 9; i++) {
        let arr = columns[i].filter(x => x.toString().match(/\d/));
        if (arr.length != new Set(arr).size) {
            boardState = 1;
            //console.log('wrong');
        }
    }
}



function checkLargeBox() {
    let largeBoxes = [];
    for (let i = 0; i < 9; i++) {
        let tempArr = [];
        for (let j = 0 ; j < 9; j++) {
            let r = Math.floor(i / 3) * 3 + Math.floor(j / 3); // 012012012, 345345345, 678678678
            let c = (i % 3 * 3) + (j % 3);
            tempArr.push(boardArr[r][c]);
        }
        largeBoxes.push(tempArr);
    }

    for (let i = 0; i < 9; i++) {
        let arr = largeBoxes[i].filter(x => x.toString().match(/\d/));
        if (arr.length != new Set(arr).size) {
            boardState = 1;
            //console.log('wrong');
        }
    }
}



//---------------------------------------- SOLVER ----------------------------------------



// [0-2][0-2]  [0-2][3-5]  [0-2][6-8]
// [3-5][0-2]  [3-5][3-5]  [3-5][6-8]
// [6-8][0-2]  [6-8][3-5]  [6-8][6-8]


// function isCorrect(row, col, val) { //using this method causes massive lag; due to stacking of functions maybe?
//     boardArr[row][col] = `${val}`;
//     checkRows();
//     checkCols();
//     checkLargeBox();
//     boardArr[row][col] = '';
//     if (boardState == 1) {
//         boardState = 0;
//         return false;
//     }
//     return true;
// }



function isCorrect(row, col, val) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (boardArr[row][j] == val || boardArr[i][col] == val) {
                return false;
            }
        }
    }

    let r = Math.floor(row / 3) * 3;
    let c = Math.floor(col / 3) * 3;

    for (let i = r; i < r + 3; i++) {
        for (let j = c; j < c + 3; j++) {
            if (boardArr[i][j] == val) {
                return false;
            } 
        }
    }
    return true;
}



function solve() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (boardArr[i][j] == '') {
                for (let k = 1; k <= 9; k++) {
                    if (isCorrect(i, j, k)) {
                        boardArr[i][j] = k;
                        if (solve()) {
                            return true;
                        }
                        else {
                            boardArr[i][j] = '';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}




// ------------------------------------ ANIMATIONS ------------------------------------ //





