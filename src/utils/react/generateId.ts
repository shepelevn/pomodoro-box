import generateRandomIndex from './generateRandomIndex';

type GeneratedId<U extends object> = { id: string } & U;

export function generateId<U extends object>(element: U): GeneratedId<U> {
  return { id: generateRandomIndex(), ...element };
}
