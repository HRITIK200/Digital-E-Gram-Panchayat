// js/logger.js

import { db } from "./firebase.js";
import {
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export async function logAction(action, role) {
  await addDoc(collection(db, "logs"), {
    action: action,
    role: role,
    timestamp: new Date().toISOString()
  });
}
