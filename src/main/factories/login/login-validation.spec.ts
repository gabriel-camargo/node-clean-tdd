import { EmailValidation } from '../../../presensation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presensation/helpers/validators/required-field-validaton'
import { Validation } from '../../../presensation/protocols/validation'
import { ValidationComposite } from '../../../presensation/helpers/validators/validation-composite'
import { EmailValidator } from '../../../presensation/protocols/email-validator'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presensation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call validation composite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
