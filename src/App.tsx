import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState("");
  const [formattedData, setFormattedData] = useState("");
  const [grid, setGrid] = useState(Array(30).fill("").map(() => Array(30).fill("e")));
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  useEffect(() => {
    if (formattedData) {
      printData();
      updateGrid(formattedData);
    }
  }, [formattedData]);

  function charToAscii(str: string) {
    setData("");
    if (str.length > 97) {
      alert("Message length should be less than 100 characters");
      console.log("Message length should be less than 100 characters");
    }
    let newFormattedData = "";
    for (let i = 0; i < str.length; i++) {
      let ch = str.charAt(i);
      let unicode = str.charCodeAt(i);

      if (unicode > 127) {
        alert(`{ch} not allowed.`);
        console.log(`{ch} not allowed.`);
      } else {
        let asciiCh = unicode.toString(2).padStart(8, "0");
        newFormattedData += asciiCh;
      }
    }

    setFormattedData(newFormattedData);

  }

  function updateGrid(str: string) {
    setShowMatrix(false);
    console.log(`rec data in updateGrid -> ${str}`);
    // Fill borders first (Ensure we get the latest grid)
    let borderedGrid = grid.map(row => [...row]);
    for (let r = 0; r < 30; r++) {
      borderedGrid[r][0] = "1";
      borderedGrid[r][29] = "1";
    }
    for (let c = 0; c < 30; c++) {
      borderedGrid[0][c] = "1";
      borderedGrid[29][c] = "1";
    }

    // Pad the data properly
    // let paddedData = str.padEnd((30 * 30) - (4 * 30 - 4), "2");  // Fill available cells

    // Deep copy for updating grid
    let tempGrid = borderedGrid.map(row => [...row]);

    // Fill the grid row-wise with data
    let curr = 0;
    let n = tempGrid.length;
    for (let i = 1; i < n - 1; i++) {  // Corrected boundaries
      for (let j = 1; j < n - 1; j++) {
        if (curr < str.length) { // Avoid out-of-bounds error
          tempGrid[i][j] = str[curr];
        }
        curr++;
      }
    }

    // Update state once
    setGrid(tempGrid);

    // Log new state
    console.log(tempGrid);

    setShowMatrix(true);
  }


  function printData() {
    console.log(formattedData);
  }

  return (
    <>
      <h1>Encodex</h1>

      <div>
        <input type="text" onChange={(e) => {
          setData(e.target.value)
        }} />
        <button onClick={() => { charToAscii(data) }}>Encode</button>
        {
          showMatrix &&
          <div className="matrix-container">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.map((cell, colIndex) => (
                  <span key={colIndex} className="matrix-cell">{cell}</span>
                ))}
              </div>
            ))}
          </div>
        }


      </div>

    </>
  )
}

export default App
