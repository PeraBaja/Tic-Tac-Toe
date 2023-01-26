var chipType = "cross";
var turn = 0;
var boxPosition = [0,1,2,3,4,5,6,7,8];
const winMessage = document.createElement("div");

document.querySelectorAll("#board .box").forEach(box => { 

  const chip = document.createElement("div");  
  box.addEventListener("click", () => {
    putChip(box, chip); 
    boxPosition[box.id] = box.firstChild.className;
    console.log(calculateWinner())
    showWinner();
  })
  document.getElementById("reset-button").addEventListener("click", () => resetBoard(box, chip))
})
function putChip(box, chip){
    if(box.firstChild === null){
        turn++;
        chip.className = chipType;
        chipType = chipType === "cross" ? "circle" : "cross";
        box.appendChild(chip);
    }
}
function resetBoard(box, chip){
    box.removeChild(chip);
}
function showWinner(){
  let winner = calculateWinner();
  
  
  if(winner !== null ){
    document.querySelector("h1").appendChild(winMessage);
    winMessage.id = "win-message";
    
     winMessage.textContent = `¡Congratulations, ${winner}!¡You win!`;
  }
  if(turn === 9){
    document.querySelector("h1").appendChild(winMessage);
    winMessage.textContent = "¡Empate!";
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
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (boxPosition[a] && boxPosition[a] === boxPosition[b] && boxPosition[a] === boxPosition[c]){
          return boxPosition[a];
        }
      }
      return null;
}
