export interface IEntity {
  getAll: () => any;
  addEntity: (entity: any) => Promise<any>;
  deleteEntity: (id: string) => Promise<any>;
}
