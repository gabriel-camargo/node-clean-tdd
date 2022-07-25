import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountBuEmailRepository: LoadAccountByEmailRepository) {

  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    await this.loadAccountBuEmailRepository.load(authentication.email)
    return null
  }
}
