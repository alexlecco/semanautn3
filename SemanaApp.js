// libraries
import React, { useContext } from 'react';

// components
import Navigation from './navigation/Navigation';
import TalkInfo from './components/TalkInfo';

// custom hooks
import useColorScheme from './hooks/useColorScheme';

// helpers
import { AppContext } from './context/provider'

const SemanaApp = _ => {
  const [state] = useContext(AppContext);
  const { talkInfoVisible } = state;
  const colorScheme = useColorScheme();

  return(
    talkInfoVisible ?
      <TalkInfo />
    :
      <Navigation colorScheme={colorScheme} />
  )
}

export default SemanaApp;