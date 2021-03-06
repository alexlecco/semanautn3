import React, { useState, createContext } from 'react';

const initialState = {
  logged: false,
  loggedUser: {},
  talkInfoVisible: false,
  talk: {},
  talks: [],
  talksMon: [],
  talksTue: [],
  talksWed: [],
  talksThu: [],
  talksFri: [],
  talksSat: [],
  speakers: [],
  userTalks: [],
  talkQuestionsContainerVisible: false,
  makeTalkQuestionVisible: false
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