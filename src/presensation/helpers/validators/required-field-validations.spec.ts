import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validaton'

const makeSut = (): RequiredFieldValidation => (
  new RequiredFieldValidation('any_field')
)

describe('RequiredField Validations', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ other_field: 'any_other_field' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validations succeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
