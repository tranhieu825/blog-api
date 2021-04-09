import { ICategoryCreateForm} from "../models/category.model";
export interface ICategoryCreateResponse {
  id: string;
  title: string;
  user_id:string;
}


export function serializeCreateCategory(
  model: ICategoryCreateForm
): ICategoryCreateResponse {
  if (!model) {
    console.log("err");
  }

  console.log('==========model===========', model)
  return {
    id: model.id,
    title: model.title,
    user_id: model.user_id,
  };
}

