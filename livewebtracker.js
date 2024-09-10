function initLiveWebTracker(config) {
  // Initialize Firebase
  firebase.initializeApp(config.firebaseConfig);
  var database = firebase.database();

  // Function to update live viewers count
  function updateLiveViewers(change) {
    var liveRef = database.ref('liveViewers');
    liveRef.transaction(function(currentCount) {
      return (currentCount || 0) + change;
    });
  }

  // Increment viewer count on page load
  updateLiveViewers(1);

  // Decrement viewer count on page unload
  window.addEventListener('beforeunload', function() {
    updateLiveViewers(-1);
  });

  // Display live viewer count in real-time
  var viewerCountDisplay = document.getElementById('viewer-count');
  database.ref('liveViewers').on('value', function(snapshot) {
    viewerCountDisplay.textContent = 'Live Viewers: ' + (snapshot.val() || 0);
  });
}
