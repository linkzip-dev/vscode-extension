export function buildArchiveFileName(projectId: string) {
  return `${projectId.toLowerCase().replace("-", "_")}_${Date.now()}.zip`;
}
