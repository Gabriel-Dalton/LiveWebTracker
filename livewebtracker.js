function initLiveWebTracker(config) {
  firebase.initializeApp(config.firebaseConfig);
  var database = firebase.database();

  function updateLiveViewers(change) {
    var liveRef = database.ref('liveViewers');
    liveRef.transaction(function(currentCount) {
      return (currentCount || 0) + change;
    });
  }

  updateLiveViewers(1);

  window.addEventListener('beforeunload', function() {
    updateLiveViewers(-1);
  });

  var viewerCountDisplay = document.getElementById('viewer-count');
  database.ref('liveViewers').on('value', function(snapshot) {
    viewerCountDisplay.textContent = 'Live Viewers: ' + (snapshot.val() || 0);
  });
}
