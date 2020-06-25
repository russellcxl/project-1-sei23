//include icons from FONTAWESOME
//include alerts from SWEETALERT2
//include animations from ANIMATE STYLE
//make title glow with JQUERY


let boardState = 0; //0 = no errors, 1 = there are errors
let gridArr = [];

for (let i = 0 ; i < 9 ; i++) {
    gridArr.push([]);
    for (let j = 0 ; j < 9 ; j++) {
        gridArr[i].push('');
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


//updating gridArr when board is updated

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('change', function() {
        gridArr[Math.floor(i/9)][i%9] = boxes[i].value;
    });
}




//---------------------------------------- POPULATING BOARD ----------------------------------------



function easyBoard() {
    gridArr = [
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
    populateBoard();
    greyStartingBoxes();
};
easyBoard();


//populate HTML board according to board array ie the backend board
function populateBoard() {
    for (let i = 0; i < gridArr.flat().length; i++) {
        boxes[i].value = gridArr.flat()[i];
    }
}


function greyStartingBoxes() {
    for (let i = 0; i < gridArr.flat().length; i++) {
        if (gridArr.flat()[i] !== '') {
            // boxes[i].style.backgroundColor = 'grey';
            boxes[i].disabled = true;
            boxes[i].style.fontWeight = 700;
            boxes[i].style.color = 'black';
        }
    }
}


//---------------------------------------- BUTTON SELECTORS ----------------------------------------



let checkButton = document.getElementById('check');
let solveButton = document.getElementById('solve');
let resetButton = document.getElementById('reset');

checkButton.addEventListener('click', function() {
    boardState = 0;
    checkRows();
    checkCols();
    checkLargeBox();
    boardState == 1 ? alert('Something is wrong') : alert('All good')
});

solveButton.addEventListener('click', function() {
    solve();
    populateBoard();
})

resetButton.addEventListener('click', function() {
    easyBoard();
})



//---------------------------------------- BOARD VERIFICATION ----------------------------------------



function checkRows() {
    for (let i = 0; i < gridArr.length; i++) {
        for (let j = 0 ; j < gridArr[i].length ; j++)  {
            for (let k = j + 1; k < gridArr[i].length; k++) {
                if (gridArr[i][j] === gridArr[i][k] && gridArr[i][j] !== '') boardState = 1;               
            }
        }
    }
}



function checkCols() {
    let arrOfColumns = [];
    for (let i = 0; i < gridArr.length; i++) {
        let tempArr = [];
        for (let j = 0 ; j < gridArr.length ; j++) {
            tempArr.push(gridArr[j][i]);
        }
        arrOfColumns.push(tempArr);    
    }

    for (let i = 0; i < arrOfColumns.length; i++) {
        for (let j = 0 ; j < arrOfColumns[i].length ; j++)  {
            for (let k = j + 1; k < arrOfColumns[i].length; k++) {
                if (arrOfColumns[i][j] === arrOfColumns[i][k] && arrOfColumns[i][j] !== '') boardState = 1;               
            }
        }
    }
}



function checkLargeBox() {
    let arrOfLargeBoxes = [];
    for (let i = 0; i < gridArr.length; i+=3) {

        let tempArr = [];
        for (let j = i; j < i+3; j++) {
            for (let k = 0; k < 3; k++) {
                tempArr.push(gridArr[j][k]);
            }
        }
        arrOfLargeBoxes.push(tempArr);

        tempArr = [];
        for (let j = i; j < i+3; j++) {
            for (let k = 3; k < 6; k++) {
                tempArr.push(gridArr[j][k]);
            }
        }
        arrOfLargeBoxes.push(tempArr);

        tempArr = [];
        for (let j = i; j < i+3; j++) {
            for (let k = 6; k < 9; k++) {
                tempArr.push(gridArr[j][k]);
            }
        }
        arrOfLargeBoxes.push(tempArr);
    }

    for (let i = 0; i < arrOfLargeBoxes.length; i++) {
        for (let j = 0; j < arrOfLargeBoxes[i].length ; j++)  {
            for (let k = j + 1; k < arrOfLargeBoxes[i].length; k++) {
                if (arrOfLargeBoxes[i][j] === arrOfLargeBoxes[i][k] && arrOfLargeBoxes[i][j] !== '') boardState = 1;               
            }
        }
    }
}




//---------------------------------------- SOLVER ----------------------------------------


//for [0][0] --> check [0][X] , [X][0] , 

// [0-2][0-2]  [0-2][3-5]  [0-2][6-8]
// [3-5][0-2]  [3-5][3-5]  [3-5][6-8]
// [6-8][0-2]  [6-8][3-5]  [6-8][6-8]


function isCorrect(row, col, val) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (gridArr[row][j] == val || gridArr[i][col] == val) {
                return false;
            }
        }
    }

    let r = Math.floor(row / 3) * 3;
    let c = Math.floor(col / 3) * 3;

    for (let i = r; i < r + 3; i++) {
        for (let j = c; j < c + 3; j++) {
            if (gridArr[i][j] == val) {
                return false;
            } 
        }
    }
    return true;
}


function solve() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (gridArr[i][j] == '') {
                for (let k = 1; k <= 9; k++) {
                    if (isCorrect(i, j, k)) {
                        gridArr[i][j] = k;
                        if (solve()){
                            return true;
                        }
                        else {
                            gridArr[i][j] = '';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}



// function isValidSudoku(grid) {
//     let seenRow = {},
//         seenCol = {},
//         seenSubBox = {},
//         seen = {};

//     for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//             let value = grid[row][col];
//             if (!(value === '.')) {
//                 let rowKey = `${row}-${value}`,
//                     colKey = `${col}-${value}`,
//                     boxKey = `${Math.floor(row/3)}-${value}-${Math.floor(col/3)}`

//                 if (seenRow[rowKey] || seenCol[colKey] || seenSubBox[boxKey]) {
//                     return false;
//                 }               
//                 seenRow[rowKey] = true;
//                 seenCol[colKey] = true;
//                 seenSubBox[boxKey] = true;
//             }
//         }
//     }
// }