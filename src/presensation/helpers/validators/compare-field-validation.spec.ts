import { InvalidParamError } from '../../errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (): CompareFieldValidation => (
  new CompareFieldValidation('field', 'field_to_compare')
)

describe('CompareField Validations', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      field_to_compare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('field_to_compare'))
  })

  test('Should not return if validations succeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      field_to_compare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
