# SUDOKU

## SEI-23: Project 1



### Basic (DONE):
1. Create board (UI and backend array for checking/solving purposes)
2. Attach listeners to UI board
3. Create buttons for starting a new game, resetting the board, etc.
4. Create function that populates board based on backend array


### Further (DONE):
1. Create checker to see if all input numbers are correct i.e. does not repeat in the row, the column and the 9x9 box the number is in.

2. Create solver

    - Loop through array to find empty boxes
    - Loop through 1-9 and use checker to admit the first valid number
    - After admitting valid number, call the function again so that it moves to the next empty box
    - Continues until no empty boxes are left
    - If, however, the function reaches a box that cannot be filled with any number from 1-9, box will remain empty and the function will return a false; in which case it goes back to the previous box and increases that number by one before proceeding thence

    - Visualisation of the function:

    ![https://upload.wikimedia.org/wikipedia/commons/8/8c/Sudoku_solved_by_bactracking.gif](https://upload.wikimedia.org/wikipedia/commons/8/8c/Sudoku_solved_by_bactracking.gif)

3. Add a win-screen using a modal


### Further 2: 
1. Create options to grey out boxes (if using a customised board), to input '?' or multiple numbers within a box, etc.
2. Improve checking function such that it points out the invalid numbers


### Further 3 (DONE): 
1. Animate board such that when the solve button is clicked, the numbers appear one by one
2. Add animation at the side to indicate when invalid numbers are placed on the board


### References: 
- For Sweet Alert
    - https://web.dev/promises/
    - https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
    - https://medium.com/javascript-in-plain-english/async-await-javascript-5038668ec6eb
- For Sudoku checking & solving
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    - https://www.geeksforgeeks.org/sudoku-backtracking-7/
    - https://stackoverflow.com/questions/42736648/sudoku-solver-in-js
- For animated ghost
    - https://codepen.io/Danimalphantom/pen/jOWwypN?editors=0110