import { IWrite } from '@interfaces/iwrite.interface';
import { IRead } from '@interfaces/iread.interface';

class BaseService<T> implements IWrite<T>, IRead<T>{

  public _collection: any;

  constructor(collection: any) {
    this._collection = collection; // insalized child collection //
    console.log('Child to parent -> _collection->', this._collection);
  }

  // Insert Records //
  async create(data: T): Promise<boolean> {
    const result = await this._collection.create(data);
    return !!result.result.ok;
  }

  // Update Records //
  async update(id: string, data: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  // Find Records //
  async find(data: T): Promise<T[]> {
    return await this._collection.find();
  }

  // Find Single Record //
  async findOne(id: string): Promise<T> {
    return await this._collection.findOne({ _id: id });
  }

  // Remove Record //
  async deleteData(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default BaseService;

