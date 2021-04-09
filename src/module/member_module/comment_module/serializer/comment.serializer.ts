import { ICommentCreateForm} from "../models/comment.model";
export interface ICommentCreateResponse {
  id: string;
  content: string;
}


export function serializeCreateComment(
  model: ICommentCreateForm
): ICommentCreateResponse {
  if (!model) {
    console.log("err");
  }

  console.log('==========model===========', model)
  return {
    id: model.id,
    content: model.content,
  };
}

