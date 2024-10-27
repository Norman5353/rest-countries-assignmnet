// country.ts

export interface Country {
  name: {
    common: string;
    official?: string;
  };
  flags: {
    png: string;
    alt?: string;
  };
  capital: string[];
  region: string;
  population: number;
}
