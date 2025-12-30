# Digital E‑Gram Panchayat 🏛️

The **Digital E-Gram Panchayat** is a web-based application designed to digitalize and streamline Panchayat services.  
It provides an online platform for citizens to apply for government services, while staff and officers can manage and verify applications efficiently. 
A lightweight, role-based web app for managing village (panchayat) services. Built with static HTML/CSS/JavaScript and Firebase (Authentication + Firestore) as the backend.

---

## ✅ Features

-### Citizen (User)
- Secure registration and login
- View available Panchayat services
- Apply for services online
- Track application status (Pending / Approved / Rejected)

-### Panchayat Staff
- Login securely
- View citizen applications
- Approve or reject applications
- Update application status in real time

-### Officer / Admin
- Create and manage Panchayat services
- View all applications
- Monitor application status
- Oversee overall system activity


---

## 🔧 Tech Stack

- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Firebase Authentication (Email/Password), Firestore

---

## 📁 Project Structure

```
/ (project root)
├─ index.html         # Login page
├─ register.html      # Registration page (choose role)
├─ admin.html         # Admin dashboard
├─ staff.html         # Staff dashboard
├─ user.html          # User dashboard
├─ css/
│  └─ style.css
└─ js/
   ├─ firebase.js     # Firebase initialization (replace config here)
   ├─ auth.js         # Login & register logic
   ├─ admin.js
   ├─ staff.js
   ├─ user.js
   └─ logger.js       # Logs actions to Firestore
```

---

## ⚙️ Firestore Collections

- `services` — available panchayat services
- `applications` — user-submitted applications
- `users` — stored user info and role
- `logs` — action logs for monitoring


---

## 🧭 How to Use

- Register using `register.html` and select a role: `user`, `staff`, or `admin`.
- Login via `index.html` — users are redirected by role:
  - `admin.html`, `staff.html`, or `user.html`
- Admin adds services via `admin.html` → `Available Services`
- Users apply via `user.html` → `Apply` button (creates an `applications` doc)
- Staff reviews and changes status (Approve / Reject) in `staff.html`

---
## 🔹 Future Enhancements

- OTP based authentication
- Document upload facility
- Notification system
- Analytics dashboard
- Mobile application integration
---

## 🐞 Troubleshooting

- Login fails → ensure **Email/Password** sign-in is enabled in Firebase Authentication.
- Firestore read/write errors → check Firestore rules and validate `firebaseConfig` in `js/firebase.js`.
- UI issues → confirm `id` attributes in HTML match selectors used in corresponding JS files.


---

## 🔹 Conclusion

The Digital E-Gram Panchayat system improves transparency, reduces paperwork, and enhances efficiency in rural governance by providing a digital solution for Panchayat services.