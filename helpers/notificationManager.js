

export function askForNotificationPermission() {
    if(hasNotificationCapability() && !isNotificationPermissionGranted()) {
        Notification.requestPermission().then(r => console.log('permission granted')).catch(err => console.log(err));
    }
}

export function sendNotification(userName) {
    if(hasNotificationCapability() && isNotificationPermissionGranted()) {
        let notification = new Notification("NeoMob timer", {
            body: `It is ${userName}'s turn now!`,
            requireInteraction: true,
            silent: false,
            icon: "/steeringwheel.png"
        });
        notification.onerror = (event) => {
            console.log(event);
        };
    }
}





function isNotificationPermissionGranted() {
    return Notification.permission === "granted";
}


function hasNotificationCapability() {
    return typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== "denied";
}