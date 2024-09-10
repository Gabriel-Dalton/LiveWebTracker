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
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
  
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

This is the main JavaScript file for LiveWebTracker that handles the Firebase integration and real-time viewer counting.

```javascript
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
```

---

### Firebase Setup Instructions

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   
2. **Enable Realtime Database**:
   - In the Firebase project, enable the **Realtime Database** and set the security rules as public during development (you can restrict it later).

3. **Configure Firebase for Your Project**:
   - In the **Project Settings** of Firebase, get your project's **firebaseConfig** credentials and replace the placeholders in the `index.html` file.
   
---

### File 3: `README.md`

```markdown
# LiveWebTracker

**LiveWebTracker** is a real-time viewer tracking tool for websites. It uses a small JavaScript snippet and Firebase Realtime Database to keep track of the number of visitors currently active on a website and displays the count in real-time.

## Features

- **Real-Time Viewer Count**: Displays the number of active visitors in real time.
- **Easy Integration**: Simply include a small script in the website’s `<head>` tag.
- **Firebase-Powered**: Uses Firebase Realtime Database to sync live data instantly.
- **Lightweight**: The JavaScript code is minimal, ensuring no noticeable performance impact.

## How to Use

### Step 1: Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Realtime Database** for your project.
3. Copy your Firebase configuration and paste it into the script configuration in the `index.html` file.

```javascript
firebaseConfig: {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### Step 2: Add the Script

To integrate LiveWebTracker into your website, add the following lines of code in your website's `<head>` tag, and replace the Firebase config values with your own.

```html
<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

<!-- LiveWebTracker Script -->
<script src="https://yourserver.com/livewebtracker.js"></script>

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
```

### Step 3: Customize Display (Optional)

You can style the viewer counter by modifying the CSS in your `index.html` file.

## License

Copyright (c) 2024 Gabriel Dalton

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
