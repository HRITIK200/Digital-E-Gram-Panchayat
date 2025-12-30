// js/auth.js

import { auth, db } from "./firebase.js";
import { logAction } from "./logger.js";


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import {
  setDoc,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// REGISTER
document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!email || !password || !role) {
    return Swal.fire("Error", "All fields are required", "error");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // save role
    await setDoc(doc(db, "users", user.uid), {
      email,
      role
    });

    Swal.fire("Success", "Registration successful", "success");
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
  await logAction("User Registered", role);
});


//LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    return Swal.fire("Error", "Enter email & password", "error");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const snap = await getDoc(doc(db, "users", user.uid));
    const role = snap.data().role;

    if (role === "admin") window.location.href = "admin.html";
    else if (role === "staff") window.location.href = "staff.html";
    else window.location.href = "user.html";

  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
    await logAction("User Logged In", role);
});
