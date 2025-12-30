// js/admin.js

import { auth, db } from "./firebase.js";
import { logAction } from "./logger.js";


import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";


let total = 0;
let pending = 0;
let approved = 0;
let rejected = 0;

// ADD SERVICE
document.getElementById("addServiceBtn").addEventListener("click", async () => {
  const name = document.getElementById("serviceName").value;
  const desc = document.getElementById("serviceDesc").value;

  if (!name || !desc) {
    return Swal.fire("Error", "All fields required", "error");
  }

  await addDoc(collection(db, "services"), {
    serviceName: name,
    description: desc
  });

  Swal.fire("Success", "Service added", "success");
  loadServices();
  await logAction("Admin added new service", "admin");

});

// LOAD SERVICES
async function loadServices() {
  const ul = document.getElementById("servicesList");
  ul.innerHTML = "";

  const snapshot = await getDocs(collection(db, "services"));

  snapshot.forEach(doc => {
    const s = doc.data();
    const li = document.createElement("li");
    li.innerText = `${s.serviceName} - ${s.description}`;
    ul.appendChild(li);
  });
}

// LOAD APPLICATIONS
async function loadApplications() {
  const tbody = document.getElementById("applicationsTable");
  tbody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "applications"));

  total = pending = approved = rejected = 0;

snapshot.forEach(doc => {
  const a = doc.data();

  total++;

  if (a.status === "Pending") pending++;
  if (a.status === "Approved") approved++;
  if (a.status === "Rejected") rejected++;

  const row = `
    <tr>
      <td>${a.userEmail}</td>
      <td>${a.serviceName}</td>
      <td><span class="status ${a.status}">${a.status}</span></td>
    </tr>
  `;
   
  tbody.innerHTML += row;
});

document.getElementById("totalCount").innerText = total;
document.getElementById("pendingCount").innerText = pending;
document.getElementById("approvedCount").innerText = approved;
document.getElementById("rejectedCount").innerText = rejected;
}

// AUTH CHECK
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadServices();
    loadApplications();
  }
});
document.getElementById("searchInput").addEventListener("keyup", () => {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#applicationsTable tr");

  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});
