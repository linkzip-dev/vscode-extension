import * as fs from "fs";
import * as vscode from "vscode";
import { loadLinkZipConfig, loadProjectConfigFile } from "../helpers/config";
import { deployCommandId, loadingCommandId } from "../consts";
import { zipBuild } from "../services/zip";
import { uploadBuild } from "../services/api";

function openConfigurationPage(extensionUri: vscode.Uri) {
  // Create and show a new webview
  const panel = vscode.window.createWebviewPanel(
    "configurationPage",
    "Extension Configuration",
    vscode.ViewColumn.One,
    {}
  );

  // Get extension's configuration
  const config = vscode.workspace.getConfiguration("yourExtensionName");

  // HTML content for the webview
  panel.webview.html = getWebviewContent(config.get<string>("someSetting"));
}

function getWebviewContent(someSettingValue?: string): string {
  // Generate HTML content for the webview
  return `
      <html>
      <body>
          <h1>Extension Configuration</h1>
          <p>Some setting value: ${someSettingValue}</p>
          <input type="text" id="settingInput" />
          <button onclick="updateSetting()">Update Setting</button>

          <script>
              const vscode = acquireVsCodeApi();

              function updateSetting() {
                  const newValue = document.getElementById('settingInput').value;
                  vscode.postMessage({
                      command: 'updateSetting',
                      value: newValue
                  });
              }
          </script>
      </body>
      </html>
  `;
}

export function handleDeployStatusBarItemClick(
  context: vscode.ExtensionContext,
  extStatusBarItem: vscode.StatusBarItem
) {
  extStatusBarItem.text = "$(sync~spin) LinkZip: Deploying...";
  extStatusBarItem.command = loadingCommandId;
  const projectConfig = loadProjectConfigFile();
  const linkZipConfig = loadLinkZipConfig();
  if (projectConfig === null) {
    vscode.window.showErrorMessage(`Project config file not found!`);
    return;
  }
  if (linkZipConfig === null) {
    vscode.window.showErrorMessage(`Linkzip configuration not found!`);
    return;
  }
  zipBuild(projectConfig, (archiveFile: string, pointer: number) => {
    uploadBuild(linkZipConfig, projectConfig, archiveFile, (data) => {
      fs.unlinkSync(archiveFile);
      vscode.window.showInformationMessage(
        `Deployed to [${data.message}](${data.message})`
      );
      extStatusBarItem.text = `LinkZip: Deploy Build`;
      extStatusBarItem.tooltip = "Click to deploy project with LinkZip";
      extStatusBarItem.color = "#FFFFFF";
      extStatusBarItem.command = deployCommandId;
    });
  });
}
