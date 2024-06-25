import { Router } from 'express';
import Inventory from './../../src/domain/Inventory';
import Connection from './../../src/infra/db/MySQLClient';
import InventoryRepository from './../../src/repository/InventoryRepository';

const routes = Router();
const connection = new Connection();
const inventoryRepository = new InventoryRepository(connection);

routes.post('/create', async (req, res) => {
  try {
    if (!req.body.type || !req.body.quantity || !req.body.name) return res.status(422).json('Missing parameters');

    const inputCreateItem = Inventory.create(req.body.type, req.body.quantity, req.body.name);
    const outputCreateItem = await inventoryRepository.create(inputCreateItem);
    return res.status(201).json(outputCreateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

routes.put('/update', async (req, res) => {
  try {
    if (!req.body.id || !req.body.type || !req.body.quantity || !req.body.name) return res.status(422).json('Missing parameters');
    const inputUpdateItem = Inventory.restore(req.body.id, req.body.type, req.body.quantity, req.body.name);
    const outputUpdateItem = await inventoryRepository.update(inputUpdateItem);
    if (!outputUpdateItem) return res.status(404).json('Not found');
    return res.status(200).json(outputUpdateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

routes.get('/:id', async (req, res) => {
  try {
    if (!req.params.id) return res.status(422).json('Missing parameters');
    const outputGetItem = await inventoryRepository.read(req.params.id);
    if (!outputGetItem) return res.status(404).json('Not found');
    return res.status(200).json(outputGetItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id) return res.status(422).json('Missing parameters');
    const outputDeleteItem = await inventoryRepository.delete(req.params.id);
    if (!outputDeleteItem) return res.status(404).json('Not found');
    return res.status(200).json(outputDeleteItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal server error');
  }
});

export default routes;
