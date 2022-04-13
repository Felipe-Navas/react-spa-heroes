import { heroes } from '../data/heroes';

/**
 * * getHeroById - returns a hero object by name
 * @param {String} name
 * @returns {Array} heroes
 */
export const getHeroesByName = (name = '') => {
  if (name === '') {
    return [];
  }

  name.toLocaleLowerCase();
  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );
};
