
import { EmailValidation } from '../../../presensation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../../presensation/helpers/validators/required-field-validaton'
import { Validation } from '../../../presensation/helpers/validators/validation'
import { ValidationComposite } from '../../../presensation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
