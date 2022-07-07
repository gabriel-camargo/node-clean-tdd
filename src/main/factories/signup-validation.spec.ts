import { CompareFieldValidation } from '../../presensation/helpers/validators/compare-field-validation'
import { RequiredFieldValidation } from '../../presensation/helpers/validators/required-field-validaton'
import { Validation } from '../../presensation/helpers/validators/validation'
import { ValidationComposite } from '../../presensation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presensation/helpers/validators/validation-composite')

describe('SignUpValidationFactory', () => {
  test('Should call validation composite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
