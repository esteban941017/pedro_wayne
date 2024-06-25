import Inventory from 'src/domain/Inventory';
import Connection from 'src/infra/db/MySQLClient';
import InventoryRepository from 'src/repository/InventoryRepository';

describe('Inventory test', () => {
  let connection: Connection;
  let inventoryRepository: InventoryRepository;

  beforeAll(() => {
    connection = new Connection();
    inventoryRepository = new InventoryRepository(connection);
  });

  test('Should create an item', async () => {
    const inputCreateItem = Inventory.create('equipamento', 500, 'computador');
    const outputCreateItem = await inventoryRepository.create(inputCreateItem);
    expect(outputCreateItem).toBe(inputCreateItem.id);
  });
  test('Should read an item', async () => {
    const inputCreateItem = Inventory.create('equipamento', 500, 'computador');
    inventoryRepository.create(inputCreateItem);
    const inputReadItem = inputCreateItem.id;
    const outputReadItem = await inventoryRepository.read(inputReadItem);
    expect(outputReadItem && outputReadItem.id).toBe(inputCreateItem.id);
    expect(outputReadItem && outputReadItem.type).toBe(inputCreateItem.type);
    expect(outputReadItem && outputReadItem.quantity).toBe(inputCreateItem.quantity);
    expect(outputReadItem && outputReadItem.name).toBe(inputCreateItem.name);
  });
  test('Should update an item', async () => {
    const inputCreateItem = Inventory.create('equipamento', 500, 'computador');
    inventoryRepository.create(inputCreateItem);
    const inputUpdateItem = Inventory.restore(inputCreateItem.id, inputCreateItem.type, 1000, inputCreateItem.name);
    const outputUpdateItem = await inventoryRepository.update(inputUpdateItem);
    expect(outputUpdateItem.id).toBe(inputUpdateItem.id);
    expect(outputUpdateItem.type).toBe(inputUpdateItem.type);
    expect(outputUpdateItem.quantity).toBe(inputUpdateItem.quantity);
    expect(outputUpdateItem.name).toBe(inputUpdateItem.name);
  });
  test('Should delete an item', async () => {
    const inputCreateItem = Inventory.create('equipamento', 500, 'computador');
    inventoryRepository.create(inputCreateItem);
    const inputDeleteItem = inputCreateItem.id;
    const outputDeleteItem = await inventoryRepository.delete(inputDeleteItem);
    expect(outputDeleteItem).toBeTruthy();
  });

  afterAll(async () => {
    await connection.close();
  });
});
