import createHttpError from 'http-errors';

import {
  createSuperhero,
  deleteSuperhero,
  getAllSuperheroes,
  getSuperheroById,
  updateSuperhero,
} from '../services/superheroes.service.js';

import { parsePaginationParams } from '../utils/parse-pagination-params.js';

export const getAllSuperheroesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const data = await getAllSuperheroes(page, perPage);

  const { superheroes, totalItems, totalPages, hasNextPage, hasPreviousPage } =
    data;

  res.status(200).json({
    status: 200,
    message:
      superheroes.length !== 0
        ? 'Successfully found superheroes!'
        : 'No superheroes found',
    data: {
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      superheroes,
    },
  });
};

export const getSuperheroByIdController = async (req, res) => {
  const { heroId } = req.params;
  const superhero = await getSuperheroById(heroId);

  if (!superhero) {
    throw createHttpError.NotFound('Superhero not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found superhero!',
    data: { superhero },
  });
};

export const createSuperheroController = async (req, res) => {
  const superhero = await createSuperhero(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created superhero!',
    data: { superhero },
  });
};

export const updateSuperheroController = async (req, res) => {
  const { heroId } = req.params;
  const superhero = await updateSuperhero(heroId, req.body);

  if (!superhero) {
    throw createHttpError.NotFound('Superhero not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated superhero!',
    data: { superhero },
  });
};

export const deleteSuperheroController = async (req, res) => {
  const { heroId } = req.params;
  const superhero = await deleteSuperhero(heroId);

  if (!superhero) {
    throw createHttpError.NotFound('Superhero not found');
  }

  res.status(204).end();
};
