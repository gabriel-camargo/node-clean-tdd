import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validaton'

describe('RequiredField Validations', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ other_field: 'any_other_field' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validations succeds', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ any_field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
