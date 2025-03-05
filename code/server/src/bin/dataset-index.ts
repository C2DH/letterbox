import { Services } from '../services';
import { DatasetIndexation } from '../services/dataset/indexation';

async function exec() {
  const datasetIndexation = Services.get(DatasetIndexation);
  const result = await datasetIndexation.doIndexation();
  console.log('Indexation result', result);
}

exec()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
