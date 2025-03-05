import { Services } from '../services';
import { DatasetImport } from '../services/dataset/import';
import { DatasetIndexation } from '../services/dataset/indexation';

async function exec() {
  const datasetIndexation = Services.get(DatasetIndexation);
  const dataprep = Services.get(DatasetImport);
  const result = await dataprep.doImport();
  console.log('Import result', result);
  const indexation = await datasetIndexation.doIndexation();
  console.log('Indexation result', indexation);
}

exec()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
