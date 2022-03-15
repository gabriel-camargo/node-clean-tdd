
import { RequiredFieldValidation } from '../../presensation/helpers/validators/required-field-validaton'
import { Validation } from '../../presensation/helpers/validators/validation'
import { ValidationComposite } from '../../presensation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
