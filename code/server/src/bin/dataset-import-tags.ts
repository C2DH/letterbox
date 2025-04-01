import { Services } from '../services';
import { DatasetImport } from '../services/dataset/import';

async function exec() {
  const dataprep = Services.get(DatasetImport);
  const result = await dataprep.importTags();
  console.log('Import result', result);
}

exec()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
