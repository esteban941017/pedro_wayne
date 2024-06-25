import Inventory from './../../src/domain/Inventory';
import Connection from './../../src/infra/db/MySQLClient';

export default class InventoryRepository {
  constructor(private readonly connection: Connection) {}

  async create(item: Inventory) {
    const statement = `INSERT INTO inventory (id, type, quantity, name)
    VALUES (?, ? ,?, ?);`;
    await this.connection.query(statement, [item.id, item.type, item.quantity, item.name]);
    return item.id;
  }

  async update(item: Inventory) {
    const statement = `UPDATE inventory SET \`type\`=?, quantity=?, name=? WHERE id=?;`;
    await this.connection.query(statement, [item.type, item.quantity, item.name, item.id]);
    return item;
  }

  async read(id: string) {
    const statement = `SELECT * FROM inventory WHERE id = ?;`;
    const [[data]] = await this.connection.query(statement, [id]);
    if (!data) return false;
    return Inventory.restore(data.id, data.type, data.quantity, data.name);
  }

  async delete(id: string) {
    const statement = `DELETE FROM inventory WHERE id = ?;`;
    const [data] = await this.connection.query(statement, [id]);
    if (!data) return false;
    return data.affectedRows === 1;
  }
}
