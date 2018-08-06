const { app } = require("electron");
const mainWindow = require("./main/mainWindow");
const mainMenu = require("./main/menu");

require("./main/index");

app.on("ready", () => {
  mainWindow.createWindow();
  mainMenu.createMenu();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow.createWindow();
  }
});
