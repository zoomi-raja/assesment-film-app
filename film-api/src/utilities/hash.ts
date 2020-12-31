const bcrypt = require('bcrypt');

export function hashPassword(passowrd: string): Promise<string> {
  return bcrypt.hash(passowrd.toString(), 5);
}

export function comparePasswords(password, passwordHash): Promise<any> {
  return bcrypt.compare(password.toString(), passwordHash);
}
