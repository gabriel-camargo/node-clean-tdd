import { Controller, HttpRequest, HttpResponse, AddAccount, Validation } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly addAcount: AddAccount,
    private readonly validation: Validation | null = null
  ) {}

  public async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation?.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body
      const account = await this.addAcount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
