const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

if (hour < 12) {
  greeting.textContent = "Good Morning ☀️";
} else if (hour < 18) {
  greeting.textContent = "Good Afternoon 🌤️";
} else {
  greeting.textContent = "Good Evening 🌙";
}
