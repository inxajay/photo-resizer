const upload = document.getElementById("upload");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const resizeBtn = document.getElementById("resizeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let image = new Image();

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

image.onload = () => {
  widthInput.value = image.width;
  heightInput.value = image.height;
};

resizeBtn.addEventListener("click", () => {
  const width = parseInt(widthInput.value);
  const height = parseInt(heightInput.value);

  if (!width || !height || isNaN(width) || isNaN(height)) {
    alert("Please enter valid width and height.");
    return;
  }

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);
  canvas.style.display = "block";

  // Set download link
  downloadBtn.href = canvas.toDataURL("image/png");
});
