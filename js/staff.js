// js/staff.js

import { auth, db } from "./firebase.js";
import { logAction } from "./logger.js";


import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

let total = 0;
let pending = 0;
let approved = 0;
let rejected = 0;

// Load all applications
async function loadApplications() {
  const tbody = document.getElementById("applicationsTable");
  tbody.innerHTML = "";

  const snapshot = await getDocs(collection(db, "applications"));

  total = pending = approved = rejected = 0;

snapshot.forEach(docSnap => {
  const app = docSnap.data();

  total++;

  if (app.status === "Pending") pending++;
  if (app.status === "Approved") approved++;
  if (app.status === "Rejected") rejected++;

  const row = `
    <tr>
      <td>${app.userEmail}</td>
      <td>${app.serviceName}</td>
      <td><span class="status ${app.status}">${app.status}</span></td>
      <td>
        <button class="approve" onclick="updateStatus('${docSnap.id}', 'Approved')">Approve</button>
        <button class="reject" onclick="updateStatus('${docSnap.id}', 'Rejected')">Reject</button>
      </td>
    </tr>
  `;
  document.getElementById("emptyMsg").style.display =
  total === 0 ? "block" : "none";

  tbody.innerHTML += row;
});

// update UI cards
document.getElementById("totalCount").innerText = total;
document.getElementById("pendingCount").innerText = pending;
document.getElementById("approvedCount").innerText = approved;
document.getElementById("rejectedCount").innerText = rejected;
}

// Update application status
window.updateStatus = async (appId, status) => {
  await updateDoc(doc(db, "applications", appId), {
    status: status
  });

  Swal.fire("Success", `Application ${status}`, "success");
  loadApplications();
    await logAction(`Application ${status}`, "staff");
};

// Auth check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadApplications();
  }
});

// Search functionality
document.getElementById("searchInput").addEventListener("keyup", () => {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#applicationsTable tr");

  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});

