export interface IEntity {
  getAll: () => any;
  addEntity: (entity: any) => Promise<any>;
  deleteEntity: (id: string) => Promise<any>;
  linkToClinic?: (entityId: string, clinicId: string) => Promise<any>;
  getEntity?: (entityId: string) => any;
}
