import { Collection, MongoClient } from 'mongodb'

class MongoHelperClass {
  public client: MongoClient

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

export const MongoHelper = new MongoHelperClass()
