import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '../../presensation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller, private readonly logRepository: LogErrorRepository) {}

  public async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      await this.logRepository.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}
