import crypto from 'crypto';

export default class Inventory {
  constructor(readonly id: string, readonly type: string, readonly quantity: number, readonly name: string) {}

  static create(type: string, quantity: number, name: string) {
    return new Inventory(crypto.randomUUID(), type, quantity, name);
  }

  static restore(id, type, quantity, name) {
    return new Inventory(id, type, quantity, name);
  }
}
