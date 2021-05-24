import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation/Navigation';

import SemanaApp from './SemanaApp';

import ContextProvider from './context/provider';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    !isLoadingComplete ?
      null
    :
      <SafeAreaProvider>
        <ContextProvider>
          <SemanaApp />
        </ContextProvider>
        <StatusBar />
      </SafeAreaProvider>
  )
}

export default App;