import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersReponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersReponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-counts'])

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString()
    }
  });

  return {
    users,
    totalCount
  }
}

export function useUsers(page: number) {
  return useQuery('users', () => getUsers(page), {
    staleTime: 1000 * 5 // 5 seconds
  })
}