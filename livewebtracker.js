import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
    import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

    const firebaseConfig = {
      apiKey: "YOUR INFORMATION",
      authDomain: "YOUR INFORMATION",
      databaseURL: "YOUR INFORMATION",
      projectId: "livewebtracker",
      storageBucket: "YOUR INFORMATION",
      messagingSenderId: "YOUR INFORMATION",
      appId: "YOUR INFORMATION",
      measurementId: "YOUR INFORMATION"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);

    function updateLiveViewers(change) {
      const liveViewersRef = ref(database, 'liveViewers');
      runTransaction(liveViewersRef, (currentCount) => {
        return (currentCount || 0) + change;
      });
    }

    updateLiveViewers(1);

    window.addEventListener('beforeunload', () => {
      updateLiveViewers(-1);
    });

    const liveCountDisplay = document.createElement('div');
    liveCountDisplay.style.position = 'fixed';
    liveCountDisplay.style.bottom = '10px';
    liveCountDisplay.style.right = '10px';
    liveCountDisplay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    liveCountDisplay.style.color = 'white';
    liveCountDisplay.style.padding = '10px';
    liveCountDisplay.style.borderRadius = '5px';
    document.body.appendChild(liveCountDisplay);

    const liveViewersRef = ref(database, 'liveViewers');
    onValue(liveViewersRef, (snapshot) => {
      liveCountDisplay.textContent = 'Live Viewers: ' + (snapshot.val() || 0);
    });
