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


let deferredPrompt;
const installBtn = document.getElementById('install-btn');

// Event listener untuk menangkap beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah prompt default
    e.preventDefault();
    // Simpan event
    deferredPrompt = e;
    // Tampilkan tombol install
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        // Sembunyikan tombol install
        installBtn.style.display = 'none';
        // Tampilkan prompt instalasi
        deferredPrompt.prompt();
        // Tunggu hasil dari prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            // Reset deferredPrompt agar tidak bisa dipanggil kembali
            deferredPrompt = null;
        });
    });
});

// Optional: Sembunyikan tombol ketika aplikasi sudah terinstal
window.addEventListener('appinstalled', () => {
    console.log('PWA telah diinstal');
    installBtn.style.display = 'none';
});

// 2. Menangani update-btn untuk muncul setiap Kamis sore
function checkForThursdayAfternoon() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // Kamis = 4
    const hours = now.getHours(); // Sore dimulai dari jam 15.00
    if (dayOfWeek === 4 && hours >= 15) {
      document.getElementById('update-btn').style.display = 'block';
    } else {
      document.getElementById('update-btn').style.display = 'none';
    }
  }
  
  // Panggil fungsi setiap menit untuk mengecek waktu
  setInterval(checkForThursdayAfternoon, 60000);
  checkForThursdayAfternoon(); // Panggilan awal saat halaman dimuat

  // 3. Menangani ios-popup
const iosPopupClosed = localStorage.getItem('close-popup-btn');
if (!iosPopupClosed) {
  document.getElementById('ios-popup').style.display = 'block';
}

document.getElementById('close-popup-btn').addEventListener('click', () => {
  document.getElementById('ios-popup').style.display = 'none';
  localStorage.setItem('ios-popup-closed', 'true');
});
