import { create } from "zustand";
import {
  createSuperhero,
  deleteSuperhero,
  getAllSuperheroes,
  updateSuperhero,
} from "../services/superheroes.service";

export const useSuperheroes = create((set, get) => ({
  superheroes: [],
  pagination: {
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  isLoading: false,
  isError: false,

  setPage: (page) => {
    const { pagination } = get();
    set({
      pagination: {
        ...pagination,
        page: page,
      },
    });
  },

  getSuperheroes: async () => {
    try {
      set({ isLoading: true });
      const { pagination } = get();
      const response = await getAllSuperheroes(pagination.page, 5);

      if (response.data?.superheroes) {
        set({ superheroes: response.data.superheroes, isError: false });
        set({
          pagination: {
            page: response.data.page,
            totalPages: response.data.totalPages,
            hasNextPage: response.data.hasNextPage,
            hasPreviousPage: response.data.hasPreviousPage,
          },
        });
      } else {
        set({ isError: true });
      }
    } catch (error) {
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSuperhero: async (heroId) => {
    try {
      const { superheroes } = get();
      const response = await deleteSuperhero(heroId);
      if (response) {
        set({
          superheroes: superheroes.filter((hero) => hero._id !== heroId),
          isError: false,
        });
      } else {
        set({ isError: true });
      }
    } catch (error) {
      set({ isError: true });
    }
  },

  updateSuperhero: async (heroId, body) => {
    try {
      const { superheroes } = get();
      const response = await updateSuperhero(heroId, body);
      if (response) {
        set({
          superheroes: superheroes.map((hero) =>
            hero._id === heroId ? response.data.superhero : hero
          ),
          isError: false,
        });
      } else {
        set({ isError: true });
      }
    } catch (error) {
      set({ isError: true });
    }
  },

  createSuperhero: async (body) => {
    try {
      const { superheroes } = get();
      const response = await createSuperhero(body);
      if (response) {
        set({
          superheroes: [response.data.superhero, ...superheroes],
          isError: false,
        });
      } else {
        set({ isError: true });
      }
    } catch (error) {
      set({ isError: true });
    }
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsError: (isError) => set({ isError }),
}));
