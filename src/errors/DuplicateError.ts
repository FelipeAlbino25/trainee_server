import { HttpError } from './HttpError'

export class DuplicateError extends HttpError {
  constructor(message = 'Double entry with same credentials') {
    super(message, 409)
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}
