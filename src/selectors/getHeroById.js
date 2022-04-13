import { heroes } from '../data/heroes';

/**
 * * getHeroById - returns a hero object by id
 * @param {String} id
 * @returns {Object} hero
 */
export const getHeroById = (id = '') => {
  return heroes.find((hero) => hero.id === id);
};
