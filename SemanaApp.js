import React, { useContext } from 'react';

import Navigation from './navigation/Navigation';
import useColorScheme from './hooks/useColorScheme';

import TalkInfo from './components/TalkInfo';
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