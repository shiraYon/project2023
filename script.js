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
  
  
    // Draw vertical line (אנכי)
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - ellipseHeight / 2);
    ctx.lineTo(centerX, centerY + ellipseHeight / 2);
    ctx.stroke();
    ctx.closePath();
  
    // Draw horizontal line (אופקי)
    ctx.beginPath();
    ctx.moveTo(centerX - ellipseWidth / 2, centerY);
    ctx.lineTo(centerX + ellipseWidth / 2, centerY);
    ctx.stroke();
    ctx.closePath();
    // Display dimensions on the canvas
      ctx.fillStyle = "blue";
      ctx.font = "12px Arial";
      ctx.fillText(`width: ${newWidth.toFixed(2)} cm`, centerX + ellipseWidth / 32, centerY - 7);
      ctx.fillText(`height: ${newHeight.toFixed(2)} cm`, centerX - 90, centerY + ellipseWidth / 32+50);
    }
   