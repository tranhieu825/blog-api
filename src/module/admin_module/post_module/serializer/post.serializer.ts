import { IPostCreateForm} from "../models/post.model";
export interface IPostCreateResponse {
  id: string;
  title: string;
  user_id:string;
}


export function serializeCreatePost(
  model: IPostCreateForm
): IPostCreateResponse {
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

