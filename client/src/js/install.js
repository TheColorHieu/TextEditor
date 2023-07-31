const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
//here we are adding an event listener to the beforeinstallprompt event
//this event is fired when the browser is ready to prompt the user to install the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    //store the installation prompt in the window.deferredPrompt property
    //that way it can be used later when the user clicks the install button
    window.deferredPrompt = event;
    //making the install button visible
    butInstall.classList.toggle('hidden', false);
});


// TODO: Implement a click event handler on the `butInstall` element
//this event handler is responsible for showing the installation prompt
butInstall.addEventListener('click', async () => {
    //we retrieve and store the installation prompt from the window.deferredPrompt property
    const promptEvent = window.deferredPrompt;
    //if the prompt is not available, we return
    //this can happen if the user has already installed the PWA
    if (!promptEvent) {
        return;
    }
    //trigger the installation prompt
    promptEvent.prompt();
    //set the window.deferredPrompt property to null
    window.deferredPrompt = null;
    //hide the install button
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
//this event handler is triggered when the PWA is installed
window.addEventListener('appinstalled', (event) => {
    // Set the 'window.deferredPrompt' property to null when the 'appinstalled' event is triggered.
    // This ensures that the prompt object is no longer needed after the app has been installed.
    window.deferredPrompt = null;
});
