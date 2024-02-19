import * as vscode from "vscode";
import { handleInitStatusBarItemClick } from "./handlers/initProject";
import { handleDeployStatusBarItemClick } from "./handlers/deployProject";
import { RenderStatusBarItem } from "./components/statusbar/render";
import { handleConfigureStatusBarItemClick } from "./handlers/configureLinkZip";
import { SupportedCommands } from "./consts";

export function activate(context: vscode.ExtensionContext) {
  // Create status bar item
  const extStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  extStatusBarItem.text = `LinkZip: Init Project`;
  extStatusBarItem.command = SupportedCommands.init;
  extStatusBarItem.show();
  context.subscriptions.push(extStatusBarItem);

  // Register listeners
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  );
  context.subscriptions.push(
    vscode.window.onDidChangeWindowState(updateStatusBarItem)
  );

  // Update status bar item once at start
  updateStatusBarItem();

  // Register the new command for handling input dialog
  context.subscriptions.push(
    vscode.commands.registerCommand(SupportedCommands.configure, () =>
      handleConfigureStatusBarItemClick(extStatusBarItem)
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(SupportedCommands.init, () =>
      handleInitStatusBarItemClick(extStatusBarItem)
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(SupportedCommands.deploy, () =>
      handleDeployStatusBarItemClick(context, extStatusBarItem)
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(SupportedCommands.loading, () =>
      vscode.window.showInformationMessage(`Deployment started`)
    )
  );

  // Update status bar item based on active editor
  function updateStatusBarItem() {
    RenderStatusBarItem(extStatusBarItem);
  }
}
