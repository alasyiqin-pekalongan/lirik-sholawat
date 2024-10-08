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
