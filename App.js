// libraries
import React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Roboto_500Medium
} from '@expo-google-fonts/roboto';

// custom hooks
import useCachedResources from './hooks/useCachedResources';

// components
import SemanaApp from './SemanaApp';

// helpers
import ContextProvider from './context/provider';

const App = _ => {
  LogBox.ignoreAllLogs()
  const isLoadingComplete = useCachedResources();
  let [ fontsLoaded ] = useFonts({ Roboto_500Medium });

  if (!fontsLoaded) {
    return null
  } else {
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

}

export default App;