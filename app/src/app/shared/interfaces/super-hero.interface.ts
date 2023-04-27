export interface SuperHero {
  id?: string;
  name: string;
  company: Company;
  info: string;
  img?: string;
}

export enum Company {
  Marvel = 'Marvel',
  DC = 'DC',
}
