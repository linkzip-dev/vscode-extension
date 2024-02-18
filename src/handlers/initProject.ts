import * as vscode from "vscode";
import * as path from "path";
import { validate as isValidUUID } from "uuid";
import { getCurrentPath } from "../helpers/file";
import { ProjectConfig } from "../types";
import { createProjectConfigFile } from "../helpers/config";
import { RenderStatusBarItem } from "../components/statusbar/render";

export function handleInitStatusBarItemClick(
  extStatusBarItem: vscode.StatusBarItem
) {
  const newJsonFilePath = path.join(getCurrentPath(), "/linkzip.json");

  vscode.window
    .showInputBox({ prompt: "Enter Project ID" })
    .then((projectId) => {
      if (isValidUUID(projectId as string)) {
        vscode.window
          .showInputBox({ prompt: "Enter deploy folder path" })
          .then((buildDirectory) => {
            const projectConfig: ProjectConfig = {
              projectId: projectId as string,
              buildDirectory: buildDirectory as string,
            };
            createProjectConfigFile(projectConfig, newJsonFilePath);
            vscode.window.showInformationMessage(
              `The project config file was created 🚀`
            );
            RenderStatusBarItem(extStatusBarItem);
          });
      } else {
        vscode.window.showErrorMessage("Invalid format for Project ID");
      }
    });
}
