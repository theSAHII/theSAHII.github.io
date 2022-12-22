import CookieJS from "../lib/CookieJS.mjs";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSPCUyA1HMWTg15U_JVQo659FSZHXNZiU",
    authDomain: "auth-a6787.firebaseapp.com",
    projectId: "auth-a6787",
    storageBucket: "auth-a6787.appspot.com",
    messagingSenderId: "759579710862",
    appId: "1:759579710862:web:10194cb5d37f69ed28c0df",
    measurementId: "G-G2KTG78CZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            let user = result.user
            let username = (user.email).split("@")[0]

            console.log(username)

            CookieJS.set({ name: "name", value: username, expiry: 1 })
            CookieJS.set({ name: "email", value: user.email, expiry: 1 })

            // return
            window.location.href = "identify_user.html"
        })
}

if (CookieJS.has("name")) Logout()

function Logout() {
    signOut(auth)
        .then(() => {
            CookieJS.delete()
            // return
            alert("Logged Out Successfully.")
            window.location.href = "login.html"
        })
}

export {
    Login, Logout
};

