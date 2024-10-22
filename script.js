// window.addEventListener('load', () => {
//     if ('serviceWorker' in navigator) {
//         // Check if the app is installed (standalone mode) or running in a browser
//         if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
//             // Web app is installed
//             console.log('Web app is installed, caching and notifications will be enabled.');

//             // Register Service Worker for caching and notifications
//             navigator.serviceWorker.register('sw.js').then(registration => {
//                 console.log('Service Worker registered with scope:', registration.scope);

//                 // Request notification permission
//                 if ('Notification' in window) {
//                     Notification.requestPermission().then(permission => {
//                         if (permission === 'granted') {
//                             console.log('Notification permission granted.');
//                         } else {
//                             console.log('Notification permission denied.');
//                         }
//                     });
//                 }
//             }).catch(error => {
//                 console.log('Service Worker registration failed:', error);
//             });
//         } else {
//             // Web app is accessed via browser
//             console.log('Web app is not installed, caching and notifications are disabled.');
//         }
//     }
// });


// // // Button Install Mobile
// // let deferredPrompt;

// // window.addEventListener('beforeinstallprompt', (e) => {
// //     // Cegah prompt default muncul
// //     e.preventDefault();
// //     // Simpan event untuk dipicu nanti
// //     deferredPrompt = e;

// //     // Tampilkan tombol instalasi khusus di UI
// //     const installButton = document.getElementById('install-button');
// //     installButton.style.display = 'block';

// //     installButton.addEventListener('click', () => {
// //         // Sembunyikan tombol setelah diklik
// //         installButton.style.display = 'none';
// //         // Tampilkan prompt instalasi
// //         deferredPrompt.prompt();
// //         // Tunggu respon pengguna
// //         deferredPrompt.userChoice.then((choiceResult) => {
// //             if (choiceResult.outcome === 'accepted') {
// //                 console.log('User accepted the install prompt');
// //             } else {
// //                 console.log('User dismissed the install prompt');
// //             }
// //             deferredPrompt = null;
// //         });
// //     });
// // });


// // Fungsi untuk deteksi iPhone
// // function isIOS() {
// //     return /iPhone|iPad|iPod/i.test(navigator.userAgent);
// // }

// // // Tampilkan pop-up jika perangkat adalah iOS
// // if (isIOS()) {
// //     // const popup = document.getElementById('ios-popup');
// //     popup.style.display = 'block'; // Tampilkan pop-up
// // }

// // Tutup pop-up saat tombol 'Tutup' diklik
// // document.getElementById('close-popup').addEventListener('click', function() {
// //     document.getElementById('notif-popup','ios-popup').style.display = 'none';
// // });

// // popup
// // const notifPopup = document.getElementById('notif-popup');
// // const iosPopup = document.getElementById('ios-popup');
// // const iosBtn = document.getElementById('ios-btn');
// // const notifBtn = document.getElementById('notif-btn');
// // const closeButtons = document.querySelectorAll('#close-popup');

// // // Menampilkan notif-popup pada awalnya
// // notifPopup.style.display = 'block';

// // // Ketika iosBtn diklik, notif-popup disembunyikan dan ios-popup ditampilkan
// // iosBtn.addEventListener('click', function () {
// //     notifPopup.style.display = 'none';
// //     iosPopup.style.display = 'block';
// // });

// // // Ketika notifBtn diklik, ios-popup disembunyikan dan notif-popup ditampilkan
// // notifBtn.addEventListener('click', function () {
// //     iosPopup.style.display = 'none';
// //     notifPopup.style.display = 'block';
// // });

// // // Ketika tombol tutup diklik, semua popup disembunyikan
// // closeButtons.forEach(button => {
// //     button.addEventListener('click', function () {
// //         notifPopup.style.display = 'none';
// //         iosPopup.style.display = 'none';
// //     });
// // });

// let deferredPrompt;
// const installBtn = document.getElementById('installBtn');
// const notifPopup = document.getElementById('notif-popup');
// const iosPopup = document.getElementById('ios-popup');
// const updatePopup = document.getElementById('update-popup');
// const closeButtons = document.querySelectorAll('.close-popup');
// const updateBtn = document.getElementById('updateBtn');

// function detectPlatform() {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;

//     // Cek apakah sudah diinstall
//     if (window.matchMedia('(display-mode: standalone)').matches) {
//         return; // Aplikasi sudah terpasang, tidak perlu menampilkan popup
//     }

//     // Deteksi Windows
//     if (/windows/i.test(userAgent)) {
//         console.log("Aplikasi dibuka di Windows, tidak menampilkan popup.");
//         return; // Tidak menampilkan popup jika di Windows
//     }

//     // Deteksi Android
//     if (/android/i.test(userAgent)) {
//         notifPopup.style.display = 'block';
//     } 
//     // Deteksi iOS
//     else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//         iosPopup.style.display = 'block';
//     }
// }

// // Event listener untuk beforeinstallprompt
// window.addEventListener('beforeinstallprompt', (e) => {
//     e.preventDefault();
//     deferredPrompt = e;
//     installBtn.style.display = 'block';

//     installBtn.addEventListener('click', () => {
//         installBtn.style.display = 'none';
//         deferredPrompt.prompt();
//         deferredPrompt.userChoice.then((choiceResult) => {
//             if (choiceResult.outcome === 'accepted') {
//                 console.log('User accepted the install prompt');
//             } else {
//                 console.log('User dismissed the install prompt');
//             }
//             deferredPrompt = null;
//         });
//     });
// });

// // Tutup popup
// closeButtons.forEach(button => {
//     button.addEventListener('click', function () {
//         notifPopup.style.display = 'none';
//         iosPopup.style.display = 'none';
//         updatePopup.style.display = 'none';
//     });
// });

// // Event listener untuk update
// function checkForUpdates() {
//     // Simulasi deteksi pembaruan, jika ada file baru, update popup muncul
//     // Misalnya cek hash atau perubahan di server
//     // const isUpdateAvailable = false; // Sesuaikan dengan logika update app kamu

//     if (isUpdateAvailable) {
//         updatePopup.style.display = 'block';
//     }
// }

// // Tombol update yang akan menghapus cache lama dan memasang yang baru
// updateBtn.addEventListener('click', () => {
//     caches.keys().then(cacheNames => {
//         return Promise.all(
//             cacheNames.map(cache => {
//                 return caches.delete(cache); // Hapus semua cache
//             })
//         );
//     }).then(() => {
//         window.location.reload(); // Refresh halaman setelah cache dihapus
//     });
// });

// // Memanggil deteksi platform
// detectPlatform();

// // Memanggil pengecekan pembaruan
// checkForUpdates();

// // Event ketika PWA sudah terpasang
// window.addEventListener('appinstalled', () => {
//     console.log('Aplikasi sudah diinstal');
//     notifPopup.style.display = 'none';
//     iosPopup.style.display = 'none';
// });

// // tombol dan waktu update
// function isThursdayAfternoon() {
//     const now = new Date();
//     const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 4 = Thursday
//     const hours = now.getHours();

//     // Cek jika hari ini adalah Kamis dan setelah jam 15:00
//     if (day === 4 && hours >= 15) {
//         return true;
//     }
//     return false;
// }

// function showUpdatePopupIfNeeded() {
//     const lastUpdate = localStorage.getItem('lastUpdate');
//     const now = new Date();

//     // Cek apakah aplikasi sudah diinstal
//     const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;

//     // Jika aplikasi sudah diinstal dan hari Kamis sore
//     if (isAppInstalled && isThursdayAfternoon()) {
//         if (!lastUpdate || new Date(lastUpdate).getTime() < now.setHours(0, 0, 0, 0)) {
//             // Jika belum update hari ini, tampilkan update popup
//             updatePopup.style.display = 'block';
//         }
//     }
// }

// // Saat tombol update di klik
// updateBtn.addEventListener('click', () => {
//     caches.keys().then(cacheNames => {
//         return Promise.all(
//             cacheNames.map(cache => {
//                 return caches.delete(cache); // Hapus semua cache
//             })
//         );
//     }).then(() => {
//         localStorage.setItem('lastUpdate', new Date()); // Simpan waktu update terakhir di localStorage
//         updatePopup.style.display = 'none'; // Sembunyikan popup setelah update
//     });
// });

// // Cek apakah hari Kamis sore dan aplikasi sudah diinstal
// // showUpdatePopupIfNeeded();


    const installBtn = document.getElementById('install-btn'); // Tombol install
    const updateBtn = document.getElementById('update-btn'); // Tombol update
    const lastUpdateKey = 'lastUpdate'; // Key untuk menyimpan waktu update terakhir

    // Fungsi untuk cek apakah aplikasi sudah terinstall
    function isAppInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches || localStorage.getItem('isAppInstalled') === 'true';
    }

    // Fungsi untuk menampilkan tombol install atau update
    function showInstallOrUpdateButtons() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 4 = Thursday
        const hours = now.getHours();

        // Cek apakah hari ini adalah Kamis
        if (day === 4) {
            if (!isAppInstalled()) {
                installBtn.style.display = 'block'; // Tampilkan tombol install
                updateBtn.style.display = 'none'; // Sembunyikan tombol update
            } else {
                // Cek apakah sudah ada update sebelumnya
                const lastUpdate = localStorage.getItem(lastUpdateKey);
                if (!lastUpdate || new Date(lastUpdate).getTime() < now.setHours(0, 0, 0, 0)) {
                    updateBtn.style.display = 'block'; // Tampilkan tombol update
                    installBtn.style.display = 'none'; // Sembunyikan tombol install
                } else {
                    installBtn.style.display = 'none'; // Sembunyikan tombol install
                    updateBtn.style.display = 'none'; // Sembunyikan tombol update
                }
            }
        } else {
            installBtn.style.display = 'none'; // Sembunyikan tombol install
            updateBtn.style.display = 'none'; // Sembunyikan tombol update
        }
    }

    // Event listener untuk tombol install
    installBtn.addEventListener('click', () => {
        localStorage.setItem('isAppInstalled', 'true'); // Simpan status instalasi di localStorage
        installBtn.style.display = 'none'; // Sembunyikan tombol install setelah diinstall
    });

    // Event listener untuk tombol update
    updateBtn.addEventListener('click', () => {
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => caches.delete(cache)) // Hapus semua cache
            );
        }).then(() => {
            localStorage.setItem(lastUpdateKey, new Date()); // Simpan waktu update terakhir di localStorage
            updateBtn.style.display = 'none'; // Sembunyikan tombol update setelah update
        });
    });

    // Jalankan fungsi saat halaman di-load
    window.addEventListener('load', () => {
        showInstallOrUpdateButtons(); // Tampilkan tombol yang sesuai saat halaman dimuat
    });

        