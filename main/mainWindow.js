const { BrowserWindow } = require("electron");
const fs = require("fs");

exports.window = null;

exports.createWindow = () => {
  this.window = new BrowserWindow({
    height: 600,
    width: 1024,
    minHeight: 600,
    minWidth: 1024,
    frame: false
  });

  this.window.webContents.on("did-finish-load", () => {
    fs.readFile("setup.json", "utf-8", (err, data) => {
      if (!err) {
        this.window.webContents.send("load-setup", JSON.parse(data));
      }
    });
  });

  this.window.loadURL("file://" + __dirname + "/../renderers/index/index.html");

  this.window.on("close", () => {
    this.window = null;
  });
};
