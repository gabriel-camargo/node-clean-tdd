import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validaton'

describe('RequiredField Validations', () => {
  test('Should returna a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ other_field: 'any_other_field' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
