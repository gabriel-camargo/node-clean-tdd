import { Collection, MongoClient } from 'mongodb'

class MongoHelperClass {
  public client: MongoClient

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)

    console.log('DB connected in ' + uri)
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }

  map = (collection: any): any => {
    const { _id, ...collectionWithoudId } = collection
    return Object.assign({}, collectionWithoudId, { id: _id.toString() })
  }
}

export const MongoHelper = new MongoHelperClass()
