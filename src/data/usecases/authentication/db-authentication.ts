import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountBuEmailRepository: LoadAccountByEmailRepository) {

  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountBuEmailRepository.load(authentication.email)
    return await new Promise(resolve => resolve(''))
  }
}
