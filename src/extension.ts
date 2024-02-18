import * as vscode from "vscode";
import { handleInitStatusBarItemClick } from "./handlers/initProject";
import { handleDeployStatusBarItemClick } from "./handlers/deployProject";
import { RenderStatusBarItem } from "./components/statusbar/render";
import { handleConfigureStatusBarItemClick } from "./handlers/configureLinkZip";
import {
  configureCommandId,
  deployCommandId,
  initCommandId,
  loadingCommandId,
} from "./consts";

export function activate(context: vscode.ExtensionContext) {
  // Create status bar item
  const extStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  extStatusBarItem.text = `LinkZip: Init Project`;
  extStatusBarItem.command = initCommandId;
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
    vscode.commands.registerCommand(configureCommandId, () =>
      handleConfigureStatusBarItemClick(extStatusBarItem)
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(initCommandId, () =>
      handleInitStatusBarItemClick(extStatusBarItem)
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(deployCommandId, () =>
      handleDeployStatusBarItemClick(context, extStatusBarItem)
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(loadingCommandId, () =>
      vscode.window.showInformationMessage(`Deployment started`)
    )
  );

  // Update status bar item based on active editor
  function updateStatusBarItem() {
    RenderStatusBarItem(extStatusBarItem);
  }
}
