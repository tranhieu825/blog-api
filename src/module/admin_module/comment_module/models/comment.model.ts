
// Create

export interface ICommentCreateForm {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
}

// Update

export interface ICommentUpdateForm {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
}