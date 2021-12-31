import { AddAccountModel, AccountModel, AddAccount, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const accountDataWithHashedPassword = Object.assign({}, accountData, { password: hashedPassword })
    const account = await this.addAccountRepository.add(accountDataWithHashedPassword)

    return await new Promise(resolve => resolve(account))
  }
}
