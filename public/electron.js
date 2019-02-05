const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const path          = require('path');
const url           = require('url');
const isDev         = require('electron-is-dev');

let mainWindow;


function createWindow()
{
	mainWindow = new BrowserWindow({ min_width : 250, min_height : 400, width : 250, height : 400 });
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${ path.join(__dirname, '../build/index.html') }`);
	mainWindow.on('closed', () => mainWindow = null);
}


app.on('ready', createWindow);

app.on('window-all-closed', () =>
{
	if ( process.platform !== 'darwin' )
	{
		app.quit();
	}
});

app.on('activate', () =>
{
	if ( mainWindow === null )
	{
		createWindow();
	}
});

// const menu = Menu.buildFromTemplate([]);
// Menu.setApplicationMenu(menu);
