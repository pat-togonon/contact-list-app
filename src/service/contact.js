import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL
})

export const getContacts = async () => {
  const response = await api.get("/users")
  return response.data
}

export const getContactById = async (id) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const addUser = async (newUser) => {
  const response = await api.post("/add", newUser)
  return response.data
}

export const updateUser = async (updatedUser) => {
  const response = await api.put(`/update/${updatedUser.id}`, updatedUser)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await api.delete(`/delete/${id}`)
  return response.data
}