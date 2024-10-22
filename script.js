window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        // Check if the app is installed (standalone mode) or running in a browser
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
            // Web app is installed
            console.log('Web app is installed, caching and notifications will be enabled.');

            // Register Service Worker for caching and notifications
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);

                // Request notification permission
                if ('Notification' in window) {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            console.log('Notification permission granted.');
                        } else {
                            console.log('Notification permission denied.');
                        }
                    });
                }
            }).catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        } else {
            // Web app is accessed via browser
            console.log('Web app is not installed, caching and notifications are disabled.');
        }
    }
});

const installBtn = document.getElementById('install-btn');
const updateBtn = document.getElementById('update-btn');
const iosPopup = document.getElementById('ios-popup');
const closePopupBtn = document.getElementById('close-popup');

let isInstalled = false;

// Periksa apakah aplikasi sudah terinstal
if (localStorage.getItem('isInstalled') === 'true') {
    isInstalled = true;
    installBtn.style.display = 'none'; // Sembunyikan tombol install
} else {
    installBtn.style.display = 'block'; // Tampilkan tombol install
}

// Tampilkan tombol update setiap hari Kamis sore (setiap minggu)
const today = new Date();
const dayOfWeek = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
const hours = today.getHours();

if (dayOfWeek === 4 && hours >= 17) { // 4 adalah Kamis dan 17 adalah jam sore
    updateBtn.style.display = 'block'; // Tampilkan tombol update
} else {
    updateBtn.style.display = 'none'; // Sembunyikan tombol update
}

// Periksa apakah pengguna menggunakan iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Tampilkan popup untuk instruksi iOS jika diperlukan
if (isIOS() && !isInstalled) {
    iosPopup.style.display = 'block'; // Tampilkan popup
} else {
    iosPopup.style.display = 'none'; // Sembunyikan popup jika bukan iOS
}

// Event listener untuk tombol install
installBtn.addEventListener('click', () => {
    // Simpan status instalasi di localStorage
    localStorage.setItem('isInstalled', 'true');
    isInstalled = true;
    installBtn.style.display = 'none'; // Sembunyikan tombol install
});

// Event listener untuk tombol update
updateBtn.addEventListener('click', () => {
    // Logika untuk pembaruan aplikasi
    console.log('Update aplikasi');
    // Anda dapat menambahkan logika pembaruan aplikasi di sini
});

// Event listener untuk menutup popup
closePopupBtn.addEventListener('click', () => {
    iosPopup.style.display = 'none'; // Sembunyikan popup
});
