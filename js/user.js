// js/user.js

import { auth, db } from "./firebase.js";
import { logAction } from "./logger.js";


import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Load services
async function loadServices(userId) {
  const servicesDiv = document.getElementById("servicesList");
  servicesDiv.innerHTML = "";

  const servicesSnapshot = await getDocs(collection(db, "services"));

  servicesSnapshot.forEach(doc => {
    const service = doc.data();

    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <h4>${service.serviceName}</h4>
      <p>${service.description}</p>
      <button onclick="applyService('${doc.id}', '${service.serviceName}')">
        Apply
      </button>

    `;

    servicesDiv.appendChild(div);
  });
}

// Apply for service
window.applyService = async (serviceId, serviceName) => {
  const user = auth.currentUser;

  await addDoc(collection(db, "applications"), {
  userId: user.uid,
  userEmail: user.email,          
  serviceId: serviceId,
  serviceName: serviceName,      
  status: "Pending"
});

  Swal.fire("Success", "Application submitted", "success");
  loadApplications(user.uid);
  await logAction("User applied for service", "user");

};

// Load user's applications
async function loadApplications(userId) {
  const tbody = document.getElementById("applicationsList");
  tbody.innerHTML = "";

  const q = query(
    collection(db, "applications"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const app = doc.data();

    const row = `
      <tr>
        <td>${app.serviceName}</td>
        <td><span class="status ${app.status}">${app.status}</span></td>

      </tr>
    `;

    tbody.innerHTML += row;
  });
}

// Auth check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadServices(user.uid);
    loadApplications(user.uid);
  }
});
