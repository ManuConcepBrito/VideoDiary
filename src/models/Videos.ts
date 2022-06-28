import { Realm, createRealmContext } from '@realm/react';
import { Tag } from './Tag';

export class Video extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  videoURI!: string;
  mood!: string;
  createdAt!: Date;
  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Video',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      videoURI: 'string',
      mood: 'string',
      createdAt: 'date',
      tags: { type: 'list', objectType: 'Tag' },
    },
  };
}

export default createRealmContext({
  schema: [Video, Tag.schema],
  deleteRealmIfMigrationNeeded: true,
});
