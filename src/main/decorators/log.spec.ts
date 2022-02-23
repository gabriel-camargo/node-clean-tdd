import { Controller, HttpRequest, HttpResponse } from '../../presensation/protocols'
import { LogControllerDecorator } from './log'
import { serverError } from '../../presensation/helpers/http-helper'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

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

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {
        name: 'ok'
      }
    }

    return await new Promise(resolve => resolve(httpResponse))
  }
}

class LogErrorRepositoryStub implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    return await new Promise(resolve => resolve())
  }
}

const makeLogErrorRepository = (): LogErrorRepository => new LogErrorRepositoryStub()

const makeController = (): Controller => new ControllerStub()

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStup, sut } = makeSut()
    const handleSpy = jest.spyOn(controllerStup, 'handle')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: '123',
        passwordConfirmation: '123'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of controller', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: '123',
        passwordConfirmation: '123'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'ok'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controllers returns a server error', async () => {
    const { sut, controllerStup, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any_stack'

    jest.spyOn(controllerStup, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(serverError(fakeError)))
    )

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: '123',
        passwordConfirmation: '123'
      }
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
