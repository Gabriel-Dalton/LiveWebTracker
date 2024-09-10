// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your Firebase configuration (replace with your actual information)
const firebaseConfig = {
  apiKey: "YOUR_INFORMATION",
  authDomain: "YOUR_INFORMATION",
  databaseURL: "YOUR_INFORMATION",
  projectId: "livewebtracker",
  storageBucket: "YOUR_INFORMATION",
  messagingSenderId: "YOUR_INFORMATION",
  appId: "YOUR_INFORMATION",
  measurementId: "YOUR_INFORMATION"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Function to update live viewers count
function updateLiveViewers(change) {
  const liveViewersRef = ref(database, 'liveViewers');
  runTransaction(liveViewersRef, (currentCount) => {
    return (currentCount || 0) + change;
  });
}

// Increment viewer count when the page is loaded
updateLiveViewers(1);

// Decrement viewer count when the page is closed/unloaded
window.addEventListener('beforeunload', () => {
  updateLiveViewers(-1);
});

// Real-time display of live viewers count
const liveCountDisplay = document.createElement('div');
liveCountDisplay.style.position = 'fixed';
liveCountDisplay.style.bottom = '10px';
liveCountDisplay.style.right = '10px';
liveCountDisplay.style.backgroundColor = 'rgba(0,0,0,0.7)';
liveCountDisplay.style.color = 'white';
liveCountDisplay.style.padding = '10px';
liveCountDisplay.style.borderRadius = '5px';
document.body.appendChild(liveCountDisplay);

// Listen for real-time updates to the live viewers count
const liveViewersRef = ref(database, 'liveViewers');
onValue(liveViewersRef, (snapshot) => {
  liveCountDisplay.textContent = 'Live Viewers: ' + (snapshot.val() || 0);
});
