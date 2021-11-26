// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Auth } = initSchema(schema);

export {
  Auth
};