import { HttpRequest, Authentication, Validation } from './login-protocols'
import { MissingParamError } from '../../errors'
import { badRequest, serverError, unautorized, ok } from '../../helpers/http-helper'
import { LoginController } from './login'

interface SutTypes {
  sut: LoginController
  authStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const authStub = makeAuth()

  const sut = new LoginController(authStub, validationStub)

  return { sut, authStub, validationStub }
}

const makeAuth = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

describe('LoginController', () => {
  test('Should call auth with correct values', async () => {
    const { sut, authStub } = makeSut()
    const authSpy = jest.spyOn(authStub, 'auth')
    const httpRequest = makeHttpRequest()

    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith(httpRequest.body.email, httpRequest.body.password)
  })

  test('Should return 401 if invalid credentias were provided', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'auth').mockReturnValueOnce(new Promise(
      (resolve) => resolve(null)
    ))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(unautorized())
  })

  test('Should return 500 if authentucatuib throws', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(
      new Error()
    )))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentias were provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token'
    }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpi = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpi).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
