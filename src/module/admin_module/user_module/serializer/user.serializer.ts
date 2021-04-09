import { IUserCreateForm} from "../models/user.model";
export interface IUserCreateResponse {
  id: string;
  name: string;
  email: string;
}


export function serializeCreateUser(
  model: IUserCreateForm
): IUserCreateResponse {
  if (!model) {
    console.log("err");
  }

  console.log('==========model===========', model)
  return {
    id: model.id,
    name: model.name,
    email: model.email,
  };
}

