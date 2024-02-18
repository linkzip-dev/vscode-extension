import * as vscode from "vscode";
import { ApiTokenSize } from "../consts";
import { saveLinkZipConfig } from "../helpers/config";
import { RenderStatusBarItem } from "../components/statusbar/render";

export function handleConfigureStatusBarItemClick(
  extStatusBarItem: vscode.StatusBarItem
) {
  vscode.window.showInputBox({ prompt: "Enter API TOKEN" }).then((apiToken) => {
    if (apiToken && apiToken.length >= ApiTokenSize) {
      saveLinkZipConfig({
        "API-TOKEN": apiToken,
      });
      vscode.window.showInformationMessage(
        `LinkZip successfully configured 🚀`
      );
      RenderStatusBarItem(extStatusBarItem);
    } else {
      vscode.window.showErrorMessage("Invalid format for API Token");
    }
  });
}
