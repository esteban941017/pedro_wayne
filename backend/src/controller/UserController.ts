import { Router } from 'express';
import User from './../../src/domain/User';
import Connection from './../../src/infra/db/MySQLClient';
import UserRepository from './../../src/repository/UserRepository';

const routes = Router();
const connection = new Connection();
const userRepository = new UserRepository(connection);

routes.post('/create', async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.username || !req.body.password || !req.body.type) return res.status(422).json('Missing parameters');
    if (req.body.type !== 'funcionario' && req.body.type !== 'gerente' && req.body.type !== 'admin segurança') return res.status(422).json('Invalid user type');

    const inputCreateUser = User.create(req.body.username, req.body.password, req.body.type);
    const outputCreateUser = await userRepository.create(inputCreateUser);
    return res.status(201).json({ userId: outputCreateUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

routes.get('/:username', async (req, res) => {
  try {
    if (!req.params.username) return res.status(422).json('Missing parameters');
    const outputGetUser = await userRepository.readByUsername(req.params.username);
    if (!outputGetUser) return res.status(404).json('Not found');
    return res.status(200).json(outputGetUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

export default routes;
