import jwt from 'jsonwebtoken';
import { Json, Value } from '../types';
import { rule } from '../validation';

export class Jwt extends Value {
  static sign = (token: Json): Jwt => new Jwt(jwt.sign(token, 'secret', { expiresIn: '1h' }));

  static of = (a: { jwt: string }): Jwt => new Jwt(a.jwt);

  decode = (): Json => jwt.decode(this.value) as Json;

  @rule('Token is not valid')
  verify(): boolean {
    try {
      jwt.verify(this.value, 'secret');
      return true;
    } catch (e) {
      return false;
    }
  }

  toJSON(): Json {
    return { jwt: this.value };
  }
}
