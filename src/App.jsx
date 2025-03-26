import React, { lazy, useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { appStore, persistor } from "./utils/store/appStore";
import DefinePaths from './components/DefinePaths';


const queryClient = new QueryClient()

function App() {
  const [showDevtools, setShowDevtools] = useState(false)

  useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={appStore} >
        <PersistGate loading={<h1>Loading.....</h1>} persistor={persistor}>
          <DefinePaths />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
export default App;

// when you want see the query details:
{/* <ReactQueryDevtools initialIsOpen={false} /> */}