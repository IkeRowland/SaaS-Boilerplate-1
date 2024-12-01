declare module 'mongoose' {
  import type { Connection, ConnectOptions } from 'mongoose';

  export type { Connection, ConnectOptions };
  export type Document = any;

  type Mongoose = {
    connect: (uri: string, options?: ConnectOptions) => Promise<typeof mongoose>;
    connection: Connection;
    Schema: typeof Schema;
    model: <T>(name: string, schema?: Schema) => Model<T>;
    models: { [key: string]: Model<any> };
  };

  class Schema {
    constructor(definition: any, options?: any);
  }

  type Model<T> = {
    new: (data: Partial<T>) => T;
    findById: (id: string) => Promise<T | null>;
    findOne: (filter: any) => Promise<T | null>;
    findByIdAndUpdate: (id: string, update: any) => Promise<T | null>;
    findOneAndUpdate: (filter: any, update: any) => Promise<T | null>;
  };

  export default Mongoose;

  declare const mongoose: Mongoose;
  export = mongoose;
}
