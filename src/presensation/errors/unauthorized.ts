export class UnautorizedError extends Error {
  constructor (stack: string = 'Server error') {
    super('Unauthorized')
    this.name = 'UnautorizedError'
  }
}
