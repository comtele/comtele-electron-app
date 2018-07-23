const { ipcRenderer } = require("electron");
const { dialog, BrowserWindow } = require("electron").remote;

ipcRenderer.on("load-setup", (e, data) => {
  $("#api-key-input").val(data.apiKey);
});

ipcRenderer.on("default-error-message", (e, message) => {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    title: "Erro",
    message: "Erro!",
    detail: message,
    buttons: ["OK"],
    type: "error"
  });
});

ipcRenderer.on("default-success-message", (e, message) => {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    title: "Sucesso",
    message: "Sucesso!",
    detail: message,
    buttons: ["OK"],
    type: "info"
  });
});

$("#show-dashboard-button").click(e => {
  $("#show-dashboard-button").addClass("active");
  $("#show-setup-button").removeClass("active");

  $("#setup-component").addClass("hide");
  $("#dashboard-component").removeClass("hide");
});

$("#show-setup-button").click(e => {
  $("#show-setup-button").addClass("active");
  $("#show-dashboard-button").removeClass("active");

  $("#setup-component").removeClass("hide");
  $("#dashboard-component").addClass("hide");
});

$("#close-button").click(e => {
  ipcRenderer.send("quit-app");
});

$("#save-setup-button").click(e => {
  ipcRenderer.send("save-setup", { apiKey: $("#api-key-input").val() });
});
