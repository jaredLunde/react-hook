const path = require('path')
const snapshots = '__snapshots__'

module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    path.join(
      testPath.split('/').slice(0, -1).join('/'),
      snapshots,
      testPath.split('/').pop() + snapshotExtension
    ),
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    path.join(
      snapshotFilePath.split('/').slice(0, -2).join('/'),
      snapshotFilePath.split('/').pop().slice(0, -snapshotExtension.length)
    ),
  testPathForConsistencyCheck: 'src/foo.test.js',
}
