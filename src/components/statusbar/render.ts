import * as vscode from "vscode";
import { loadLinkZipConfig } from "../../helpers/config";
import { SupportedCommands } from "../../consts";

export interface IUpdateStatusBar {
  text: string;
  tooltip: string;
  color: string;
  command: SupportedCommands;
}
export function UpdateStatusBar(
  extStatusBarItem: vscode.StatusBarItem,
  params: IUpdateStatusBar
) {
  extStatusBarItem.text = params.text;
  extStatusBarItem.tooltip = params.tooltip;
  extStatusBarItem.color = params.color;
  extStatusBarItem.command = params.command;
}

export function RenderStatusBarItem(extStatusBarItem: vscode.StatusBarItem) {
  if (extStatusBarItem.command != SupportedCommands.loading) {
    const config = loadLinkZipConfig();
    if (config) {
      vscode.workspace.findFiles("**/linkzip.json").then((file) => {
        if (file.length > 0) {
          UpdateStatusBar(extStatusBarItem, {
            color: "#FFFFFF",
            tooltip: "Click to deploy project with LinkZip",
            command: SupportedCommands.deploy,
            text: "LinkZip: Deploy Build",
          });
        } else {
          UpdateStatusBar(extStatusBarItem, {
            color: "#FFFFFF",
            tooltip: "Click to init project with LinkZip",
            command: SupportedCommands.init,
            text: "LinkZip: Init Project",
          });
        }
      });
    } else {
      UpdateStatusBar(extStatusBarItem, {
        color: "#E78895",
        tooltip: "Click to configure LinkZip",
        command: SupportedCommands.configure,
        text: `$(gear) LinkZip: configure`,
      });
    }
  }
}
