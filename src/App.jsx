import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./queryClient";
import RainBoard from "./RainBoard";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RainBoard/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default App;