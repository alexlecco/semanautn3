import React, { useState, createContext } from 'react';

const initialState = {
  logged: false,
  loggedUser: {},
  userTalks: [],
  talk: {},
  talkInfoVisible: false,
  talks: [],
  talksMon: [],
  talksTue: [],
  talksWed: [],
  talksThu: [],
  talksFri: [],
  speakers: [],
};

const ContextProvider = ({children}) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider;
export const AppContext = createContext();