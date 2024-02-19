import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { LinkZipConfig, ProjectConfig } from "../types";
import { systemConfig } from "../consts";
import { getCurrentPath } from "./file";

export function createProjectConfigFile(
  config: ProjectConfig,
  filePath: string
): void {
  const jsonData = JSON.stringify(config, null, 2);
  fs.writeFileSync(filePath, jsonData);
}

export function loadProjectConfigFile(): ProjectConfig | null {
  const configFilePath = path.join(getCurrentPath(), "/linkzip.json");
  console.log(configFilePath);
  try {
    const jsonData = fs.readFileSync(configFilePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
}

export function loadLinkZipConfig(): LinkZipConfig | null {
  const homeDir = os.homedir();
  const configFilePath = path.join(
    homeDir,
    systemConfig.configFolder,
    systemConfig.configFileName
  );
  try {
    const jsonData = fs.readFileSync(configFilePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
}

export function saveLinkZipConfig(config: LinkZipConfig): void {
  const homeDir = os.homedir();
  const configFolderPath = path.join(homeDir, systemConfig.configFolder);
  if (!fs.existsSync(configFolderPath)) {
    fs.mkdirSync(configFolderPath);
  }

  const configFilePath = path.join(
    configFolderPath,
    systemConfig.configFileName
  );
  const jsonData = JSON.stringify(config, null, 2);
  fs.writeFileSync(configFilePath, jsonData);
}
