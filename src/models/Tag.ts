import { Realm, createRealmContext } from '@realm/react';

export class Tag extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  text!: string;

  static schema = {
    name: 'Tag',
    embedded: true,
    properties: {
      _id: 'objectId',
      text: 'string',
    },
  };
}

export default createRealmContext({
  schema: [Tag],
  deleteRealmIfMigrationNeeded: true,
});
