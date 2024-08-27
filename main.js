let chipType = "cross";
let turn = 0;
const boxes = [...document.querySelectorAll("#board .box")]

const winMessage = document.createElement("div");

document.getElementById("reset-button").addEventListener("click", () => resetGame())

boxes.forEach(box => { 

    const chip = document.createElement("div");  
    box.addEventListener("click", () => {
      putChip(box, chip); 
      console.log(calculateWinner())
      showWinner();
    })
    
})
function putChip(box, chip){
    if(box.firstChild === null){
        chip.className = chipType;
        chipType = chipType === "cross" ? "circle" : "cross"
        turn += 1
        box.appendChild(chip);
    }
}

function resetGame(){
    boxes.forEach(box => {
        if (box.hasChildNodes()){
            box.removeChild(box.firstChild )
        }
    })
    
    turn = 0;
    enableBoxes()
    winMessage.textContent = ''
}
function showWinner(){
  let winner = calculateWinner();
  
  if(winner !== null){
    document.querySelector("h1").appendChild(winMessage)
    winMessage.id = "win-message"
    
    winMessage.textContent = `¡Congratulations, ${winner}!¡You win!`
    disableBoxes()
  }
  else if(turn === 9){
    document.querySelector("h1").appendChild(winMessage)
    winMessage.textContent = "¡Is a match!"
    disableBoxes()
  }
}
function calculateWinner(){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      const chips = boxes.map(box => box.firstChild?.className)
      
      for (const line of lines) {
        const [a, b, c] = line;
        
        if (chips[a] && chips[a] === chips[b] && chips[a] === chips[c]){
          return chips[a];
        }
      }
    
    return null;
}

function disableBoxes(){
    boxes.forEach(box => { 
        box.disabled = true
      })
}
function enableBoxes(){
    boxes.forEach(box => { 
        box.disabled = false
      })
}

