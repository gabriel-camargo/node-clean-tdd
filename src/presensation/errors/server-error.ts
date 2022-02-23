export class ServerError extends Error {
  constructor (stack: string = 'Server error') {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
