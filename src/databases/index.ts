import config from 'config';
import { dbConfig } from '@interfaces/db.interface';
// console.log('-------------------------->',config)
const { host, port, database }: dbConfig = config.get('dbConfig');
console.log(database)
export const dbConnection = {
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
