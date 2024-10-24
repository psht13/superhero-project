export const API_BASE_URL = "http://localhost:5500/api";

export const getAllSuperheroes = async (page, perPage) => {
  const response = await fetch(
    `${API_BASE_URL}/superheroes/all?page=${page}&perPage=${perPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();

  return json;
};

export const getSuperheroById = async (heroId) => {
  const response = await fetch(`${API_BASE_URL}/superheroes/${heroId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  return json;
};

export const updateSuperhero = async (heroId, body) => {
  const response = await fetch(`${API_BASE_URL}/superheroes/${heroId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();

  return json;
};

export const createSuperhero = async (body) => {
  const response = await fetch(`${API_BASE_URL}/superheroes`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();

  return json;
};

export const deleteSuperhero = async (heroId) => {
  const response = await fetch(`${API_BASE_URL}/superheroes/${heroId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();

  return json;
};
