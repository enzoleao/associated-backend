import { IFindAuthData } from "../interfaces/find-auth-data.interface";


export interface IPlataformRepository {
  findAuthData(serviceData: IFindAuthData);
}
