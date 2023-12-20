export interface IAuthor {
  id: string;
  image: string;
  name: string;
}

export interface ICommunity {
  id: string;
  image: string;
  name: string;
}

export interface IPost {
  _id: string;
  author: IAuthor;
  currentUserId: string | undefined;
  community: ICommunity | null;
  children: IPost[];
  text: string;
  createdAt: string;
  parentId: string | null;
  isComment?: boolean;
}
