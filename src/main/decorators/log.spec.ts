import { Controller, HttpRequest, HttpResponse } from '../../presensation/protocols'
import { LogControllerDecorator } from './log'
import { ok, serverError } from '../../presensation/helpers/http/http-helper'
import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'
import { AccountModel } from '../../domain/models/account'

interface sutTypes {
  sut: LogControllerDecorator
  controllerStup: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): sutTypes => {
  const controllerStup = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStup, logErrorRepositoryStub)

  return {
    controllerStup,
    sut,
    logErrorRepositoryStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'

  return serverError(fakeError)
}
class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = ok(makeFakeAccount())
    return await new Promise(resolve => resolve(httpResponse))
  }
}

class LogErrorRepositoryStub implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    return await new Promise(resolve => resolve())
  }
}

const makeLogErrorRepository = (): LogErrorRepository => new LogErrorRepositoryStub()

const makeController = (): Controller => new ControllerStub()

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStup, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStup, 'handle')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of controller', async () => {
    const { sut } = makeSut()

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('Should call LogErrorRepository with correct error if controllers returns a server error', async () => {
    const { sut, controllerStup, logErrorRepositoryStub } = makeSut()

    jest.spyOn(controllerStup, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(makeFakeServerError()))
    )

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
