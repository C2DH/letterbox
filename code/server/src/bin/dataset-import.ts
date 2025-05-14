import { Services } from '../services';
import { DatasetImport } from '../services/dataset/import';
import { DatasetIndexation } from '../services/dataset/indexation';

async function exec(args: string[]) {
  const usefulArgs = args.slice(2);
  const pdfFilePattern = usefulArgs.length > 0 ? new RegExp(usefulArgs[0]) : undefined;

  const datasetIndexation = Services.get(DatasetIndexation);
  const dataprep = Services.get(DatasetImport);
  const result = await dataprep.doImport(pdfFilePattern);
  console.log('Import result', result);
  const indexation = await datasetIndexation.doIndexation();
  console.log('Indexation result', indexation);
}

exec(process.argv)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
