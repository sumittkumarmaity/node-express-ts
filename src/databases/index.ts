import config from 'config';
import { dbConfig } from '@interfaces/db.interface';
const { host, port, database }: dbConfig = config.get('dbConfig');
export const dbConnection = {
  //url: `mongodb+srv://gc_test_user:0UmMG9Avg85tOzo0@cluster0.35lnz.mongodb.net/GC_Tset_DB?retryWrites=true&w=majority`,
  //url: `mongodb+srv://bikram:Abcd!!1234@cluster0.q8vq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
