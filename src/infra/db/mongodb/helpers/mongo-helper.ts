import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)

    console.log('DB connected in ' + uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  },

  map: (collection: any): any | null => {
    if (collection === null) {
      return null
    }
    const { _id, ...collectionWithoudId } = collection
    return Object.assign({}, collectionWithoudId, { id: _id.toString() })
  }
}
