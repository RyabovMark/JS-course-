export interface IBody {
  name: string;
  info?: boolean;
  isImportant?: boolean;
}

export interface IJsonBody {
  name: string;
  info?: string;
  isImportant?: string;
}

export interface IPost {
  name: string;
  info: boolean;
  isCompleted: boolean;
  isImportant: boolean;
  id: number;
}

