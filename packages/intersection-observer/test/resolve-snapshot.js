const path = require('path')
const snapshots = 'test/__snapshots__'
const src = path.join(__dirname, '../src')

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    path.join(snapshots, path.relative(src, testPath)) + snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace(snapshots, 'src')
      .slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck: 'src/foo.test.js',
}
