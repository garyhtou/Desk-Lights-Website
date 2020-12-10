import firebaseServer from "firebase/app";
import "firebase/database";

if (!firebaseServer.apps.length) {
	firebaseServer.initializeApp({
		apiKey: "AIzaSyBvMgMnlTeE3dzV-gWNeFCx0Y7noPDRChQ",
		authDomain: "desk-lights-5a43a.firebaseapp.com",
		databaseURL: "https://desk-lights-5a43a-default-rtdb.firebaseio.com",
		projectId: "desk-lights-5a43a",
		storageBucket: "desk-lights-5a43a.appspot.com",
		messagingSenderId: "1020303207331",
		appId: "1:1020303207331:web:1710f9c1889e78eacf0816",
		measurementId: "G-3Q4FL79CTF",
	});
}

export { firebaseServer };
