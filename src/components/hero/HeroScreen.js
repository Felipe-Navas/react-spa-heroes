import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {
  const { heroId } = useParams();

  const hero = getHeroById(heroId);

  if (!hero) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Hero Screen</h1>
      {hero.superhero}
    </div>
  );
};
