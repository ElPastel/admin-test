import { API_BASE_URL } from "configs/AppConfig"

const userService = {}

userService.getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`)
  const data = await response.json()
  return data
}

userService.deleteUser = async (id) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  })
  return response
}

export default userService
