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
        newInput.oninput = function() {
            if (!this.value.match(/[0-9]/g)) this.value = '';
        }
        newInput.onfocus = "this.select()"; //doesn't work
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


//updating boardArr when board is updated

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('change', function() {
        boardArr[Math.floor(i/9)][i%9] = boxes[i].value;
    });
}




//---------------------------------------- POPULATING BOARD ----------------------------------------



class Board {
    constructor(difficulty) {
        this.difficulty = '';
    }

    populate() { //not sure if i'm using classes right; all the boards can be put into an object for easy retrieval

        if (this.difficulty === 'easy') {
            boardArr = [
                ['', '', '', '2', '', '1', '8', '4', ''],
                ['', '8', '', '', '3', '', '', '', ''],
                ['2', '', '9', '', '', '6', '', '3', '5'],
                ['', '', '3', '', '5', '4', '', '9', ''],
                ['', '', '8', '1', '', '3', '4', '', ''],
                ['', '7', '', '8', '6', '', '1', '', ''],
                ['8', '4', '', '9', '', '', '3', '', '2'],
                ['', '', '', '', '7', '', '', '8', ''],
                ['', '6', '2', '3', '', '8', '', '', '']
            ];
        }

        else if (this.difficulty === 'medium') {
            boardArr = [
                ['', '2', '', '6', '', '8', '', '', ''],
                ['5', '8', '', '', '', '9', '7', '', ''],
                ['', '', '', '', '4', '', '', '', ''],
                ['3', '7', '', '', '', '', '5', '', ''],
                ['6', '', '', '', '', '', '', '', '4'],
                ['', '', '8', '', '', '', '', '1', '3'],
                ['', '', '', '', '2', '', '', '', ''],
                ['', '', '9', '8', '', '', '', '3', '6'],
                ['', '', '', '3', '', '6', '', '9', '']
            ];
        }

        else if (this.difficulty === 'hard') {
            boardArr = [
                ['', '1', '', '', '8', '', '', '', ''],
                ['', '', '2', '4', '', '', '9', '', ''],
                ['', '', '8', '6', '', '', '', '', '7'],
                ['2', '7', '', '', '', '', '', '1', ''],
                ['', '4', '1', '', '5', '', '7', '2', ''],
                ['', '8', '', '', '', '', '', '6', '9'],
                ['4', '', '', '', '', '5', '2', '', ''],
                ['', '', '6', '', '', '9', '3', '', ''],
                ['', '', '', '', '4', '', '', '9', '']
            ];
        }
        else {
            boardArr = [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '']
            ];
        }
        
        populateBoard();
        greyStartingBoxes();
    }  
}



function easyBoard() {
    boardArr = [
        ['', '', '', '2', '', '1', '8', '4', ''],
        ['', '8', '', '', '3', '', '', '', ''],
        ['2', '', '9', '', '', '6', '', '3', '5'],
        ['', '', '3', '', '5', '4', '', '9', ''],
        ['', '', '8', '1', '', '3', '4', '', ''],
        ['', '7', '', '8', '6', '', '1', '', ''],
        ['8', '4', '', '9', '', '', '3', '', '2'],
        ['', '', '', '', '7', '', '', '8', ''],
        ['', '6', '2', '3', '', '8', '', '', '']
    ];
    populateBoard();
    greyStartingBoxes();
};
easyBoard();



//populate HTML board according to board array ie the backend board
function populateBoard() {
    for (let i = 0; i < boardArr.flat().length; i++) {
        boxes[i].value = boardArr.flat()[i];
    }
}


function greyStartingBoxes() {
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
    
    // const inputOptions = new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve({
    //             '#ff0000': 'Red',
    //             '#00ff00': 'Green',
    //             '#0000ff': 'Blue'
    //         })
    //     }, 1000)
    // })
      
    // const { value: color } = await Swal.fire({
    //     title: 'Select color',
    //     input: 'radio',
    //     inputOptions: inputOptions,
    //     inputValidator: (value) => {
    //         if (!value) {
    //             return 'You need to choose something!'
    //         }
    //     }
    // })
      
    // if (color) {
    //     Swal.fire({ html: `You selected: ${color}` })
    // }

});



let newButton = document.getElementById('difficulty'),
    checkButton = document.getElementById('check'),
    solveButton = document.getElementById('solve'),
    resetButton = document.getElementById('reset');


newButton.addEventListener('click', function() {
    let board = new Board('empty');
    board.populate();
})


checkButton.addEventListener('click', function() {   
    boardState = 0;
    checkRows();
    checkCols();
    checkLargeBox();

    if (boardState == 1) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `You've got a mistake somewhere`,
            showConfirmButton: false,
            timer: 1200
        })
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


solveButton.addEventListener('click', function() {    
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
            if (result.value) {
                solve();
                populateBoard();
            }
        });   
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
            if (result.value) {
            easyBoard();
            }
        });
});



//---------------------------------------- BOARD VERIFICATION ----------------------------------------



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





