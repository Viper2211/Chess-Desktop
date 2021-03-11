const { app, BrowserWindow, Menu } = require('electron')
const client = require('discord-rich-presence')('819605030553911336');

let window = null;

const createWindow = () =>{
    window = new BrowserWindow({
        title: "Chess.com",
        center: true,
        resizable: true,
        webPreferences:{
            nodeIntegration: false,
            show: false
        },
        icon: __dirname + '/assets/chess.ico',
    });

    Menu.setApplicationMenu(null);

    window.loadURL('https://www.chess.com/login_and_go?returnUrl=https%3A%2F%2Fwww.chess.com%2F');
    window.once('ready-to-show',()=>{
        window.show();
    });

    window.on('closed',()=>{
        window = null;
        client.disconnect();
    });
}

let getOther = 'document.getElementsByClassName("user-username-component user-username-lightgray user-tagline-username")[0].textContent';
let other = null;

app.on('ready', ()=> {
    createWindow();
    setInterval(()=> {
        if (window) window.webContents.executeJavaScript(getOther, true).then((result) => {
            other = result;
        }).catch(()=>{});
    },100);

    setInterval(()=> {
        client.updatePresence({
            details: "Playing Chess",
            state: (other) ? `Playing against ${other}` : 'Chilling',
            largeImageKey: 'largeimage',
            largeImageText: "Haha Easter Eggs are fun",
            instance: true,
        });
    },15000)
});