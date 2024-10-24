import { SuperheroCollection } from '../db/models/superhero.model.js';

import { calculatePaginationData } from '../utils/calculate-pagination-data.js';

export const getAllSuperheroes = async (page, perPage) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const superheroQuery = SuperheroCollection.find();

  const [totalItems, superheroes] = await Promise.all([
    await SuperheroCollection.countDocuments(),
    await superheroQuery.skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return { superheroes, ...paginationData };
};

export const getSuperheroById = async (heroId) => {
  const superhero = await SuperheroCollection.findById(heroId);
  return superhero;
};

export const createSuperhero = async (payload) => {
  const superheroData = {
    nickname: payload.nickname,
    real_name: payload.real_name,
    origin_description: payload.origin_description,
    superpowers: payload.superpowers,
    catch_phrase: payload.catch_phrase,
    images: payload.images ?? null,
  };

  const superhero = await SuperheroCollection.create(superheroData);
  return superhero;
};

export const updateSuperhero = async (heroId, payload) => {
  const superheroData = {
    nickname: payload.nickname,
    real_name: payload.real_name,
    origin_description: payload.origin_description,
    superpowers: payload.superpowers,
    catch_phrase: payload.catch_phrase,
    images: payload.images ?? null,
  };

  const superhero = await SuperheroCollection.findByIdAndUpdate(
    heroId,
    superheroData,
    { new: true },
  );
  return superhero;
};

export const deleteSuperhero = async (heroId) => {
  const superhero = await SuperheroCollection.findByIdAndDelete(heroId);
  return superhero;
};
