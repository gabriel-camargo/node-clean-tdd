import { Controller, HttpRequest, HttpResponse } from '../../presensation/protocols'
import { LogControllerDecorator } from './log'

interface sutTypes {
  sut: LogControllerDecorator
  controllerStup: Controller
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

const makeController = (): Controller => new ControllerStub()

const makeSut = (): sutTypes => {
  const controllerStup = makeController()
  const sut = new LogControllerDecorator(controllerStup)

  return {
    controllerStup,
    sut
  }
}

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
})
