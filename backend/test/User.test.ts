import User from 'src/domain/User';
import Connection from 'src/infra/db/MySQLClient';
import UserRepository from 'src/repository/UserRepository';

let connection: Connection;
let userRepository: UserRepository;
describe('User test', () => {
  beforeAll(() => {
    connection = new Connection();
    userRepository = new UserRepository(connection);
  });
  test('Should create a user', async () => {
    const inputCreateUser = User.create(`User${Math.round(Math.random() * 1000)}`, `Pass${Math.round(Math.random() * 1000)}`, 'funcionario');
    const outputCreateUser = await userRepository.create(inputCreateUser);
    expect(outputCreateUser).toBe(inputCreateUser.id);
  });

  test('Should get a user by username', async () => {
    const inputCreateUser = User.create(`User${Math.round(Math.random() * 1000)}`, `Pass${Math.round(Math.random() * 1000)}`, 'funcionario');
    await userRepository.create(inputCreateUser);
    const inputGetUser = inputCreateUser.username;
    const outputGetUser = await userRepository.readByUsername(inputGetUser);
    expect(outputGetUser && outputGetUser.id).toBe(inputCreateUser.id);
    expect(outputGetUser && outputGetUser.username).toBe(inputCreateUser.username);
    expect(outputGetUser && outputGetUser.password).toBe(inputCreateUser.password);
    expect(outputGetUser && outputGetUser.type).toBe(inputCreateUser.type);
  });

  afterAll(async () => {
    await connection.close();
  });
});
