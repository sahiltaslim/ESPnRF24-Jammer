const slider = document.getElementById("txpower-slider");
const label = document.getElementById("slider-label");
const applyButton = document.getElementById("apply-button");
const sliderThumb = document.getElementById("slider-thumb");

const labels = [
  "Low (-18dBm)",
  "Medium (-12dBm)",
  "High (-6dBm)",
  "Maximum (OdBm)",
];

function updateSlider() {
  const value = parseInt(slider.value, 10);
  label.textContent = labels[value];

  const min = parseInt(slider.min, 10);
  const max = parseInt(slider.max, 10);
  const thumbWidth = sliderThumb.offsetWidth;
  const sliderWidth = slider.offsetWidth;

  const trackWidth = sliderWidth - thumbWidth;
  const percentage = (value - min) / (max - min);
  const position = percentage * trackWidth;

  sliderThumb.style.left = `${position}px`;
}
window.onload = updateSlider;

applyButton.addEventListener("click", () => {
  const sliderValue = slider.value;
  location.href = `/radio_txpower_method?current_val=${sliderValue}`;
});

slider.addEventListener("input", updateSlider);
window.addEventListener("resize", updateSlider);
