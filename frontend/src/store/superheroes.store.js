import { create } from "zustand";
import {
  createSuperhero,
  deleteSuperhero,
  getAllSuperheroes,
  updateSuperhero,
} from "../services/superheroes.service";

export const useSuperheroes = create((set, get) => ({
  superheroes: [],
  page: 1,
  isLoading: false,
  isError: false,

  getSuperheroes: async () => {
    try {
      set({ isLoading: true });
      const { page } = get(); // Access page from the state
      const response = await getAllSuperheroes(page, 3);

      if (response.data?.superheroes) {
        set({ superheroes: response.data.superheroes, isError: false });
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
      const { superheroes } = get(); // Get current state
      const response = await deleteSuperhero(heroId); // Await for the deletion
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
      const { superheroes } = get(); // Get current state
      const response = await updateSuperhero(heroId, body); // Await for the update
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
      const { superheroes } = get(); // Get current state
      const response = await createSuperhero(body); // Await for creation
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

  setPage: (page) => set({ page }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsError: (isError) => set({ isError }),
}));
