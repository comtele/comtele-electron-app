const { app, ipcMain } = require("electron");
const fs = require("fs");

ipcMain.on("quit-app", (e, data) => {
  app.quit();
});

ipcMain.on("save-setup", (e, setupData) => {
  if (!setupData) {
    return;
  }

  var jsonData = JSON.stringify(setupData);

  fs.writeFile("setup.json", jsonData, err => {
    if (err) {
      e.sender.send("default-error-message", err.message);
    }

    e.sender.send(
      "default-success-message",
      "Os dados de configuração foram salvos com sucesso."
    );
  });
});
