import crypto from 'crypto';

export default class User {
  constructor(readonly id: string, readonly username: string, readonly password: string, readonly type: Type) {}

  static create(username: string, password: string, type: Type) {
    return new User(crypto.randomUUID(), username, password, type);
  }

  static restore(id: string, username: string, password: string, type: Type) {
    return new User(id, username, password, type);
  }
}

export type Type = 'funcionario' | 'gerente' | 'admin segurança';
