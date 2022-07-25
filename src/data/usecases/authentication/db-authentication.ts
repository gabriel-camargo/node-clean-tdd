import {
  AuthenticationModel,
  HashComparer,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Authentication
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountBuEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountBuEmailRepository.load(authentication.email)
    if (account === null) return null

    const passwordIsCorrect = await this.hashComparer.compare(authentication.password, account.password)
    if (!passwordIsCorrect) return null

    const token = await this.tokenGenerator.generate(account.id)
    await this.updateAccessTokenRepository.update(account.id, token)
    return token
  }
}
