const yearSpan = document.getElementById('year');
const lastModifiedSpan = document.getElementById('lastModified');
yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

const temp = 10; // Celsius
const wind = 5; // km/h

document.getElementById('temp').textContent = temp;
document.getElementById('wind').textContent = wind;

function calculateWindChill(t, s) {
  return 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);
}

function displayWindChill() {
  const windChillSpan = document.getElementById('windchill');
  if (temp <= 10 && wind > 4.8) {
    const chill = calculateWindChill(temp, wind);
    windChillSpan.textContent = chill.toFixed(1) + ' °C';
  } else {
    windChillSpan.textContent = 'N/A';
  }
}

displayWindChill();