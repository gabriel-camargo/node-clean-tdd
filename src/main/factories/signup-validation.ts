
import { CompareFieldValidation } from '../../presensation/helpers/validators/compare-field-validation'
import { EmailValidation } from '../../presensation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../presensation/helpers/validators/required-field-validaton'
import { Validation } from '../../presensation/helpers/validators/validation'
import { ValidationComposite } from '../../presensation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
