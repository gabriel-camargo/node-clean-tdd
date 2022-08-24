import { EmailValidation, ValidationComposite, RequiredFieldValidation } from '../../../presensation/helpers/validators'
import { Validation } from '../../../presensation/protocols/validation'
import { EmailValidator } from '../../../presensation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

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
