import { CompareFieldValidation } from '../../presensation/helpers/validators/compare-field-validation'
import { EmailValidation } from '../../presensation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../presensation/helpers/validators/required-field-validaton'
import { Validation } from '../../presensation/helpers/validators/validation'
import { ValidationComposite } from '../../presensation/helpers/validators/validation-composite'
import { EmailValidator } from '../../presensation/protocols/email-validator'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presensation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidationFactory', () => {
  test('Should call validation composite with all validations', () => {
    makeSignUpValidation()

    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
