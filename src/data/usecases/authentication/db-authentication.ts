import {
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Authentication
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountBuEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountBuEmailRepository.load(authentication.email)
    if (account === null) return null

    const passwordIsCorrect = await this.hashComparer.compare(authentication.password, account.password)
    if (!passwordIsCorrect) return null

    const token = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.update(account.id, token)
    return token
  }
}
