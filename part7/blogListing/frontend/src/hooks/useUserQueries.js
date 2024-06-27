import { useQuery } from '@tanstack/react-query'

import userService from '../services/users'

export const useUserQueries = () => {
  const getUsers = useQuery({
    queryKey: ['blogs'],
    queryFn: userService.getAll,
    // enabled: !!user,
    select: (data) => {
      return data
    },
  })

  return {
    getUsers,
  }
}
