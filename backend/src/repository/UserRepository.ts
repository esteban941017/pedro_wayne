import User, { Type } from './../../src/domain/User';
import Connection from './../../src/infra/db/MySQLClient';

export default class UserRepository {
  constructor(private readonly connection: Connection) {}

  async create(user: User) {
    const statement = `INSERT INTO users (id, username, password, type)
    VALUES (?, ? ,?, ?);`;
    await this.connection.query(statement, [user.id, user.username, user.password, user.type]);
    return user.id;
  }

  async readByUsername(username: string) {
    const statement = `SELECT * FROM users WHERE username = ?;`;
    const [[data]] = await this.connection.query(statement, [username]);
    if (!data) return false;
    return User.restore(data.id, data.username, data.password, data.type);
  }
}
