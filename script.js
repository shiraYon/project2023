// script.js

// Default values
const defaultValues = {
    height: 5,
    width: 5,
    margin: 1,
    shrinkage: 40,
    thickness_US: 0,
  };
  
  // Set default values to input elements
  Object.keys(defaultValues).forEach((key) => {
    const inputElement = document.getElementById(key);
    if (inputElement) {
      inputElement.value = defaultValues[key];
    }
  });
  
  function calculateSize() {
    // Get user input
    const height = parseFloat(document.getElementById("height").value);
    const width = parseFloat(document.getElementById("width").value);
    const margin = parseFloat(document.getElementById("margin").value);
    const shrinkagePercentage = parseFloat(
      document.getElementById("shrinkage").value,
    );
    const thickness_US = parseFloat(
      document.getElementById("thickness_US").value,
    );
    const radiation = document.getElementById("radiation").checked || false;
  
    // Validate input
    if (
      isNaN(height) ||
      isNaN(width) ||
      isNaN(margin) ||
      isNaN(shrinkagePercentage) ||
      isNaN(thickness_US)
    ) {
      alert("Please enter valid numerical values.");
      return;
    }
  
    // Update shrinkage based on radiation
    const finalShrinkage = radiation ? 50 : shrinkagePercentage;
  
    // Calculate new size
    const shrinkageFactor = 1 - finalShrinkage / 100;
    const newHeight = (height + margin) / shrinkageFactor;
    const newWidth = (width + margin) / shrinkageFactor;
  
    // Calculate corrected thickness
    const correctedThickness = thickness_US * 0.7;
  
    // Display results in the result div
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ` Tumor Size:<br>Height: ${height} cm, Width: ${width} cm<br><br><strong>The size of the tissue that needs to be cut:<br>Height: ${newHeight.toFixed(
      2,
    )} cm, Width: ${newWidth.toFixed(
      2,
    )} cm</strong><br><br>Thickness after correction of 30%: ${correctedThickness.toFixed(
      2,
    )} cm`;
  
    if (radiation) {
      resultDiv.innerHTML +=
        "<br><br>Since radiation is involved, we used shrinkage of 50%.";
    }
  
    // Draw ellipse
    const canvas = document.getElementById("ellipseCanvas");
    const ctx = canvas.getContext("2d");
  
    // Convert centimeters to pixels
    const cmToPixels = 20;
  
    const ellipseWidth = newWidth * cmToPixels;
    const ellipseHeight = newHeight * cmToPixels;
  
    // Set canvas size based on ellipse dimensions
    canvas.width = ellipseWidth +30 ;
    canvas.height = ellipseHeight +30;
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw rectangle
    ctx.beginPath();
    ctx.rect(
      centerX - ellipseWidth / 2,
      centerY - ellipseHeight / 2,
      ellipseWidth,
      ellipseHeight,
    );
    ctx.stroke();
    ctx.closePath();
  
    // Draw ellipse
    ctx.beginPath();
    ctx.ellipse(
      centerX,
      centerY,
      ellipseWidth / 2,
      ellipseHeight / 2,
      0,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = "#add5ff";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  
    // Draw numbers on the left side
   // drawYAxisNumbers(ctx, centerX/cmToPixels, centerY/cmToPixels, ellipseHeight/cmToPixels, cmToPixels);
  
    // Draw numbers on the bottom
  //  drawXAxisNumbers(ctx, centerX, centerY, ellipseWidth/cmToPixels, cmToPixels);
  }
  
  // ...
  
  /*function drawYAxisNumbers(ctx, centerX, centerY, ellipseHeight, cmToPixels) {
   /*const yAxis = document.getElementById("y-axis");
    yAxis.innerHTML = "";
  
    let step;
    if (ellipseHeight > 20) {
      step = 10;
    } else if (ellipseHeight >= 10) {
      step = 5;
    } else if (ellipseHeight >= 3) {
      step = 2;
    } else if (ellipseHeight >= 1) {
      step = 0.5;
    } else {
      step = 0.2;
    }
    ctx.fillStyle = "black";
    ctx.font = "18px serif";
    ctx.fillText("1", 15, 12);
   
    i=0
    const yPos = centerY - ellipseHeight / 2 + i;
    
    /*for (let i = 0; i <= ellipseHeight; i += step * cmToPixels) {
  
  
      const yPos = centerY - ellipseHeight / 2 + i;
      ctx.fillText((i / cmToPixels).toFixed(2), centerX - 30, yPos + 15);
    }
  }
  
  function drawXAxisNumbers(ctx, centerX, centerY, ellipseWidth, cmToPixels) {
    const xAxis = document.getElementById("x-axis");
    xAxis.innerHTML = "";
  
    let step;
    if (ellipseWidth > 20) 
      step = 10;
    } else if (ellipseWidth >= 10) {
      step = 5;
    } else if (ellipseWidth >= 3) {
      step = 2;
    } else if (ellipseWidth >= 1) {
      step = 0.5;
    } else {
      step = 0.2;
    }
    
    for (let i = 0; i <= ellipseWidth; i += step * cmToPixels) {
      const xPos = centerX - ellipseWidth / 2 + i;
      ctx.fillText((i / cmToPixels).toFixed(2), xPos+15, centerY + 20);
    }
  }
  */