const { app, BrowserWindow, Menu } = require("electron");
const server = require("./index.js");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true, // Remove the default window frame
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load your HTML file or URL
  mainWindow.loadURL("http://localhost:8080");

  // Set an empty menu
  Menu.setApplicationMenu(null);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("resize", function (e, x, y) {
  mainWindow.setSize(x, y);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
