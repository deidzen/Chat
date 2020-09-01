import Login from './views/login.js';
import Register from './views/register.js';
import Settings from './views/settings.js';
import Chat from './views/chat.js';
import AddChat from './views/add-chat.js';
import Error404 from './views/error404.js';

import Utils from './services/utils.js';

let user = null;

const routes = {
    '/': Login,
    '/register' : Register,
    '/settings' : Settings,
    '/chat' : Chat,
    '/chat/:id' : Chat,
    '/add-chat' : AddChat
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    const all = [];
    // Lazy load view element:
    const body = null || document.querySelector('body');


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();
    
    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + 
        (request.id ? '/:id' : '');
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    
    if (page === Chat) {
        if (firebase.auth().currentUser) {
            body.innerHTML = await page.render(); 
            // await page.afterRender();
            await page.afterRender(Number.parseInt(request.id));
        } else {
            body.innerHTML = await Login.render();
            window.location.hash = '/';
            await Login.afterRender();
        }
    } else if (page === Settings) {
        if (firebase.auth().currentUser) {
            body.innerHTML = await page.render(); 
            await page.afterRender();
        } else {
            body.innerHTML = await Login.render();
            window.location.hash = '/';
            await Login.afterRender();
        }
    } else if (page === AddChat) {
        if (firebase.auth().currentUser) {
            body.innerHTML = await page.render(); 
            await page.afterRender();
        } else {
            body.innerHTML = await Login.render();
            window.location.hash = '/';
            await Login.afterRender();
        }
    }
    else if (page === Login) {
        body.innerHTML = await page.render(); 
        await page.afterRender();
    } else {
        body.innerHTML = await page.render(); 
        await page.afterRender();
    }

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:

window.addEventListener('DOMContentLoaded', () => {
    
    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            user = firebaseUser.email;
            window.location.hash = '/chat';
        } else {
            window.location.hash = '/';
        }
        // router();
    });    
    
});