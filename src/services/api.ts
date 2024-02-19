import * as fs from "fs";
import * as path from "path";
import * as request from "request";
import { ApiResponse, LinkZipConfig, ProjectConfig } from "../types";
import { systemConfig } from "../consts";

export function uploadBuild(
  linkZipConfig: LinkZipConfig,
  projectConfig: ProjectConfig,
  buildFile: string,
  deployMessage: string,
  callback: (data: ApiResponse) => void
) {
  const apiURL = systemConfig.api;
  const parsed = new URL(buildFile, "file:///");
  const fileName = path.basename(parsed.pathname);
  const options = {
    method: "POST",
    url: `${apiURL}/upload`,
    headers: {
      "X-AUTH-TOKEN": linkZipConfig["API-TOKEN"],
      "X-AUTH-PROJECT": projectConfig.projectId,
      "X-MESSAGE": deployMessage,
    },
    formData: {
      build_file: {
        value: fs.createReadStream(buildFile),
        options: {
          filename: fileName,
          contentType: null,
        },
      },
    },
  };

  request(options, function (error, response) {
    if (error) throw Error(error);
    const data = JSON.parse(response.body);
    callback(data);
  });
}
