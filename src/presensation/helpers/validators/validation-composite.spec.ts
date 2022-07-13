import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeSut = (): ValidationComposite => (
  new ValidationComposite([new ValidationStub()])
)

class ValidationStub implements Validation {
  validate (input: any): Error {
    return new MissingParamError('field')
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
