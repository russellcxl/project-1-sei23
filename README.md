# SUDOKU

## SEI-23: Project 1



### Basic:
1. Create board (UI and array for checking)
2. Attach listeners
3. Create button for starting a new game / resetting board
4. Populate UI board using values from the backend array


### Further:
1. Create checker to see if all input numbers are correct i.e. does not repeat in the row, the column and the 9x9 box the number is in.

2. Create solver

    - Loop through array to find empty boxes
    - Loop through 1-9 and use checker to admit the first valid number
    - After admitting valid number, call the function again so that it moves to the next empty box
    - Continues until no empty boxes are left
    - If, however, the function reaches a box that cannot be filled with any number from 1-9, box will remain empty and the function will return a false; in which case it goes back to the previous box and increases that number by one before proceeding thence

    - Visualisation of the function:

    ![https://en.wikipedia.org/wiki/Backtracking#/media/File:Sudoku_solved_by_bactracking.gif](https://en.wikipedia.org/wiki/Backtracking#/media/File:Sudoku_solved_by_bactracking.gif)


### Further: 
1. Add various animations -- numbers falling into board, shaking the wrong numbers when check button is clicked, etc
2. Add background music??
3. Make pretty the entire set
4. Give options to draw a '?' or multiple numbers in a box. Also allow user to grey out boxes if they are setting their own puzzle.


### References: 
- For Sweet Alert
    - https://web.dev/promises/
    - https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
    - https://medium.com/javascript-in-plain-english/async-await-javascript-5038668ec6eb
- For Sudoku checking & solving
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    - https://www.geeksforgeeks.org/sudoku-backtracking-7/
    - https://stackoverflow.com/questions/42736648/sudoku-solver-in-js