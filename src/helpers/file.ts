import * as vscode from "vscode";

export function getCurrentPath(): string {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    const currentWorkspaceFolder = workspaceFolders[0];
    const workspaceFolderUri = currentWorkspaceFolder.uri;
    return workspaceFolderUri.fsPath;
  } else {
    throw Error("Could not get the current directory path!");
  }
}
