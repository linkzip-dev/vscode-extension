import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { loadLinkZipConfig, loadProjectConfigFile } from "../helpers/config";
import { ApiErrorKey, ApiErrors, SupportedCommands } from "../consts";
import { zipBuild } from "../services/zip";
import { uploadBuild } from "../services/api";
import { UpdateStatusBar } from "../components/statusbar/render";
import { getCurrentPath } from "../helpers/file";

export function handleDeployStatusBarItemClick(
  context: vscode.ExtensionContext,
  extStatusBarItem: vscode.StatusBarItem
) {
  UpdateStatusBar(extStatusBarItem, {
    color: "#FFFFFF",
    tooltip: "Deploying in progress...",
    command: SupportedCommands.loading,
    text: "$(sync~spin) LinkZip: Deploying...",
  });

  vscode.window
    .showInputBox({ prompt: "Enter deploy message or leave empty" })
    .then((deployMessage) => {
      const projectConfig = loadProjectConfigFile();
      const linkZipConfig = loadLinkZipConfig();
      if (projectConfig === null) {
        vscode.window.showErrorMessage(`Project config file not found!`);
        UpdateStatusBar(extStatusBarItem, {
          color: "#FFFFFF",
          tooltip: "Click to deploy project with LinkZip",
          command: SupportedCommands.deploy,
          text: "LinkZip: Deploy Build",
        });
        return;
      }
      if (linkZipConfig === null) {
        vscode.window.showErrorMessage(`Linkzip configuration not found!`);
        UpdateStatusBar(extStatusBarItem, {
          color: "#FFFFFF",
          tooltip: "Click to deploy project with LinkZip",
          command: SupportedCommands.deploy,
          text: "LinkZip: Deploy Build",
        });
        return;
      }

      const buildFolderPath = path.join(
        getCurrentPath(),
        projectConfig.build_dir
      );
      if (!fs.existsSync(buildFolderPath)) {
        vscode.window.showErrorMessage(
          `Project build folder ${projectConfig.build_dir} does not exists!`
        );
        UpdateStatusBar(extStatusBarItem, {
          color: "#FFFFFF",
          tooltip: "Click to deploy project with LinkZip",
          command: SupportedCommands.deploy,
          text: "LinkZip: Deploy Build",
        });
        return;
      }

      zipBuild(projectConfig, (archiveFile: string, pointer: number) => {
        uploadBuild(
          linkZipConfig,
          projectConfig,
          archiveFile,
          deployMessage as string,
          (data) => {
            fs.unlinkSync(archiveFile);
            if (data.status == "ok") {
              vscode.window.showInformationMessage(
                `Deployed to [${data.message}](${data.message})`
              );
            } else {
              const error = ApiErrors[data.message as ApiErrorKey];
              vscode.window.showErrorMessage(`LinkZip deploy: ${error}`);
            }
          }
        );
      });

      UpdateStatusBar(extStatusBarItem, {
        color: "#FFFFFF",
        tooltip: "Click to deploy project with LinkZip",
        command: SupportedCommands.deploy,
        text: "LinkZip: Deploy Build",
      });
    });
}
