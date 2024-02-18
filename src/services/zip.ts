import * as fs from "fs";
import * as recursive from "recursive-readdir";
import * as archiver from "archiver";
import * as path from "path";
import { buildArchiveFileName } from "../helpers/archive";
import { ProjectConfig } from "../types";
import { getCurrentPath } from "../helpers/file";
import { systemConfig } from "../consts";

export function zipBuild(
  projectConfig: ProjectConfig,
  callback: (newZipFile: string, pointer: number) => void
) {
  const archiveFileName = buildArchiveFileName(projectConfig.projectId);
  process.chdir(`${getCurrentPath()}/${projectConfig.buildDirectory}`);

  recursive(".", function (err, files) {
    if (err) {
      throw err;
    }
    const newZipFile = `${getCurrentPath()}/${archiveFileName}`;
    const output = fs.createWriteStream(newZipFile);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", function () {
      callback(newZipFile, archive.pointer());
    });

    archive.on("error", function (err) {
      throw err;
    });

    archive.pipe(output);

    const ignoreExtensions = systemConfig.ignoreExtensions;
    for (const iterator of files) {
      if (!ignoreExtensions.includes(path.extname(iterator).replace(".", ""))) {
        archive.file(iterator, { name: iterator });
      }
    }
    archive.finalize();
  });
}
