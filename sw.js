// sw.js - Service Worker for Firebase Cloud Messaging
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBeZl52HEWGz-vE72QZ5taznvpYTfq3QUk",
    authDomain: "login-and-reg-5728d.firebaseapp.com",
    databaseURL: "https://login-and-reg-5728d-default-rtdb.firebaseio.com",
    projectId: "login-and-reg-5728d",
    storageBucket: "login-and-reg-5728d.firebasestorage.app",
    messagingSenderId: "435846403197",
    appId: "1:435846403197:web:d6a05a55e40839d15dcd14"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
    
    const notificationTitle = payload.notification?.title || 'Triveni Pathsala';
    const notificationOptions = {
        body: payload.notification?.body || 'New update available',
        icon: '/icon.png',
        badge: '/badge.png',
        vibrate: [200, 100, 200],
        data: payload.data || {}
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    event.waitUntil(clients.claim());
});