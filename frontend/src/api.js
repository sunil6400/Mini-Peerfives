const API_BASE_URL = "http://localhost:5000";

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

export const getUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return response.json();
};

export const createUser = async (name) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const editUser = async (id, name) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const getP5History = async (id) => {
  const response = await fetch(`${API_BASE_URL}/p5/${id}`);
  return response.json();
};

export const deleteP5 = async (userId, p5Id) => {
  const response = await fetch(`${API_BASE_URL}/p5/${userId}/${p5Id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getRewardsHistory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/rewards/${id}`);
  return response.json();
};
