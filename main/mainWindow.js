const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
const { TextMessageService, ReplyService } = require("comtele-sdk");

exports.sending = false;

function sendMessages(inputFolder, apiKey) {
  setInterval(() => {
    if (this.sending) return;

    this.sending = true;
    fs.readdir(inputFolder, (err, files) => {
      if (files.length === 0) {
        this.sending = false;
        return;
      }

      if (err) {
        this.sending = false;
        console.log(err.message);
        return;
      }

      files.forEach(file => {
        let fileName = path.join(inputFolder, file);

        fs.readFile(fileName, "utf-8", (err, content) => {
          if (err) {
            this.sending = false;
            console.log(err.message);
            return;
          }

          let contentParts = content.split("|");

          if (contentParts.length !== 3) {
            this.sending = false;
            return;
          }

          var textMessageService = new TextMessageService(apiKey);
          textMessageService.send(
            contentParts[0],
            contentParts[1],
            [contentParts[2]],
            data => {
              this.sending = false;
              if (data.Success) {
                fs.unlink(fileName, err => {
                  if (err) {
                    console.log(err.message);
                  }
                });
              }
            }
          );
        });
      });
    });
  }, 1000);
}

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
    var appDataPath = app.getPath("appData");
    var fileName = path.join(appDataPath, "ComteleApp", "setup.json");

    fs.readFile(fileName, "utf-8", (err, data) => {
      if (!err) {
        let parsedData = JSON.parse(data);
        this.window.webContents.send("load-setup", parsedData);
        sendMessages(parsedData.inputFolder, parsedData.apiKey);
      }
    });
  });

  this.window.loadURL("file://" + __dirname + "/../renderers/index/index.html");

  this.window.on("close", () => {
    this.window = null;
  });
};
