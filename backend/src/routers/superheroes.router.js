import { Router } from 'express';
import express from 'express';

import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import { isValidId } from '../middlewares/validate-id.middleware.js';
import { validateBody } from '../middlewares/validate-body.middleware.js';
import { superheroSchema } from '../validation/superheroes.schema.js';

import {
  createSuperheroController,
  deleteSuperheroController,
  getAllSuperheroesController,
  getSuperheroByIdController,
  updateSuperheroController,
} from '../controllers/superheroes.controller.js';

const router = Router();

router.get('/all', ctrlWrapper(getAllSuperheroesController));

router.get(
  '/:heroId',
  isValidId('heroId'),
  ctrlWrapper(getSuperheroByIdController),
);

router.post(
  '/',
  express.json(),
  validateBody(superheroSchema),
  ctrlWrapper(createSuperheroController),
);

router.patch(
  '/:heroId',
  isValidId('heroId'),
  express.json(),
  validateBody(superheroSchema),
  ctrlWrapper(updateSuperheroController),
);

router.delete(
  '/:heroId',
  isValidId('heroId'),
  ctrlWrapper(deleteSuperheroController),
);

export default router;
