import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountBuEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountBuEmailRepository.load(authentication.email)
    if (account === null) return null

    const passwordIsCorrect = await this.hashComparer.compare(authentication.password, account.password)
    if (!passwordIsCorrect) {
      return null
    }

    return 'token'
  }
}
