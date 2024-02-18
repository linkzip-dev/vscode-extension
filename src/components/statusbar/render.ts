import * as vscode from "vscode";
import { loadLinkZipConfig } from "../../helpers/config";
import {
  configureCommandId,
  deployCommandId,
  initCommandId,
  loadingCommandId,
} from "../../consts";

export function RenderStatusBarItem(extStatusBarItem: vscode.StatusBarItem) {
  if (extStatusBarItem.command != loadingCommandId) {
    const config = loadLinkZipConfig();
    if (config) {
      const files = vscode.workspace
        .findFiles("**/linkzip.json")
        .then((file) => {
          if (file.length > 0) {
            extStatusBarItem.text = `LinkZip: Deploy Build`;
            extStatusBarItem.tooltip = "Click to deploy project with LinkZip";
            extStatusBarItem.color = "#FFFFFF"; // Set color for visibility
            extStatusBarItem.command = deployCommandId; // Set the new command ID for the status bar item
          } else {
            extStatusBarItem.text = `LinkZip: Init Project`;
            extStatusBarItem.tooltip = "Click to init project with LinkZip";
            extStatusBarItem.color = "#FFFFFF"; // Set color for visibility
            extStatusBarItem.command = initCommandId; // Set the new command ID for the status bar item
          }
        });
    } else {
      extStatusBarItem.text = `$(gear) LinkZip: configure`;
      extStatusBarItem.tooltip = "Click to configure LinkZip";
      extStatusBarItem.color = "#E78895"; // Set color for visibility
      extStatusBarItem.command = configureCommandId; // Set the new command ID for the status bar item
    }
  }
}
