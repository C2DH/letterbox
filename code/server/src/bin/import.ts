import { Services } from '../services';
import { Dataprep } from '../services/dataprep';

async function exec() {
  const dataprep = Services.get(Dataprep);
  const result = await dataprep.doImport();
  console.log(result);
}

exec()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
