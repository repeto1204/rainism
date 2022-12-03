import { QueryClient } from '@tanstack/react-query'
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 30 * 1000,
        },
        mutations: {
            retry: false,
        },
    },
})