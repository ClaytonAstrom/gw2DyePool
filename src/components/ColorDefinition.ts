export interface Color {
  id: number;
  // eslint-disable-next-line camelcase
  chat_link: string;
  icon: string;
  color: {
    id: number;
    name: string;
    cloth: number[];
    leather: number[];
    metal: number[];
    fur: number[];
  };
}
