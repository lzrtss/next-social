export interface IAuthor {
  _id?: string;
  id: string;
  image: string;
  name: string;
}
export interface IPost {
  _id: string;
  author: IAuthor;
  currentUserId: string | undefined;
  children: IPost[];
  text: string;
  createdAt: string;
  parentId: string | null;
  isComment?: boolean;
}
