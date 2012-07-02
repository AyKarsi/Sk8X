var config = {
    //apiUrl : "http://10.237.122.200:99/",
    apiUrl : "http://localhost:99/",
    "config_version": "2",
    "platform_version": "v1.3",
    "name": "trigger02",
    "author": "karsten@grombach.com",
    "version": "0.1",
    "description": "My Extension Description",
    "modules": {
    "activations": [
        {
            "patterns": ["http://*/*", "https://*/*"],
            "styles": [],
            "scripts": ["js/every-page.js"],
            "run_at": "start",
            "all_frames": false
        }
    ],
        "background": {
        "files": ["js/background.js"]
    },
    "button": {

        "default_popup": "index.html",
        "default_icon": "resources/sun_19.png"
    },
    "contact": true,
        "event": true,
        "file": true,
        "geolocation": true,
        "is": true,
        "logging": {
        "level": "INFO"
    },
    "message": true,
        "notification": true,
        "prefs": true,
        "request": {
        "permissions": ["http://resttrigger.aykarsi.c9.io/*", "http://localhost:8023/api/*", "http://idler:8023/api/*"]
    },
    "sms": true,
        "tabs": true,
        "tools": true
}
}
