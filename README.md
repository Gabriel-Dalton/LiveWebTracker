### **LiveWebTracker**

---

**LiveWebTracker** is a real-time viewer tracking solution that enables website owners to see how many live visitors are currently on their website. Using a lightweight JavaScript script and Firebase Realtime Database, it provides instant updates on user presence without the need for a complex backend setup.

---

### Features:
- **Real-Time Viewer Count**: Track the number of live visitors in real-time.
- **Easy Integration**: Simply add a `<script>` tag to any website to activate the tracking.
- **Lightweight & Efficient**: Minimal script size with efficient real-time updates.
- **Scalable**: Firebase handles real-time data synchronization, making the solution scalable even for large audiences.
- **Customizable Viewer Display**: Easily style and position the live viewer counter on your website.

---

### Technologies:
- **JavaScript (Frontend)**
- **Firebase Realtime Database (Backend)**
- **HTML** (for the demo setup)

---

## GitHub Repository Setup

Create a GitHub repository named **LiveWebTracker** and include the following files:

---

### File 1: `index.html` (Demo Page)

This file demonstrates how to implement LiveWebTracker on a basic webpage.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LiveWebTracker Demo</title>
  
  <!-- Firebase SDKs -->
  <script src="https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"></script>
  
  <!-- LiveWebTracker Script -->
  <script src="livewebtracker.js"></script>
  
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin-top: 50px;
    }
    .viewer-count {
      position: fixed;
      bottom: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>Welcome to LiveWebTracker Demo</h1>
  <p>This is a simple page to show how LiveWebTracker works.</p>

  <div class="viewer-count" id="viewer-count">Live Viewers: 0</div>

  <!-- Initialize LiveWebTracker -->
  <script>
    initLiveWebTracker({
      firebaseConfig: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
        databaseURL: "YOUR_FIREBASE_DATABASE_URL",
        projectId: "YOUR_FIREBASE_PROJECT_ID",
        storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_FIREBASE_APP_ID"
      }
    });
  </script>
</body>
</html>
```

### File 2: `livewebtracker.js`

This is the main JavaScript file for LiveWebTracker that handles Firebase integration and real-time viewer counting.

```javascript
function initLiveWebTracker(config) {
  // Initialize Firebase
  firebase.initializeApp(config.firebaseConfig);
  const database = firebase.database();

  // Function to update live viewers count
  function updateLiveViewers(change) {
    const liveViewersRef = database.ref('liveViewers');
    liveViewersRef.transaction((currentCount) => {
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
  const viewerCountDisplay = document.getElementById('viewer-count');
  database.ref('liveViewers').on('value', function(snapshot) {
    viewerCountDisplay.textContent = 'Live Viewers: ' + (snapshot.val() || 0);
  });
}
```

---

### Firebase Setup Instructions

1. **Create a Firebase Project**:
   - Go to https://console.firebase.google.com/ and create a new project.
   
2. **Enable Realtime Database**:
   - In the Firebase project, enable the **Realtime Database** and set the security rules as public during development (you can restrict it later).

3. **Configure Firebase for Your Project**:
   - In the **Project Settings** of Firebase, get your project's **firebaseConfig** credentials and replace the placeholders in the `index.html` file.


## License

This project is licensed under the MIT License.

Here's the fixed version of that section of the README:

---

### Firebase Database Rules

To ensure that the real-time viewer tracking works properly, you should configure the Firebase Realtime Database rules. Use the following rule for basic public access during development:

```json
{
  "rules": {
    "liveViewers": {
      ".read": true,
      ".write": "newData.isNumber() && newData.val() >= 0"
    }
  }
}
```

This rule ensures that:

- **Read access**: Anyone can read the current live viewer count from the database (necessary for displaying the count in real-time).
- **Write access**: Only valid numbers (positive integers) can be written to the database. This prevents non-numeric values from being written and ensures the viewer count remains accurate.


This rule ensures that:
- **Read access** is public.
- **Write access** only allows valid numerical values (for counting live viewers).

---

### Final Steps

1. **Deploy the Firebase Project**: Ensure your Firebase setup is properly configured.
2. **Host the Files**: Deploy both the `index.html` and `livewebtracker.js` files to a web server (e.g., GitHub Pages, Netlify).
3. **Track Live Viewers**: Open multiple instances of the page to see the real-time viewer count increase and decrease.
