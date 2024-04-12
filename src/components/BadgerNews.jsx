import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import BadgerTabs from './navigation/BadgerTabs';
import BadgerPrefContext from '../../contexts/BadgerPrefContext';


export default function BadgerNews(props) {
  // Just a suggestion for Step 4! Maybe provide this to child components via context...
  const [prefs, setPrefs] = useState({});

  return (
    <>
      <NavigationContainer>
        <BadgerPrefContext.Provider value={[prefs, setPrefs]}>
          <BadgerTabs />
        </BadgerPrefContext.Provider>
      </NavigationContainer>
    </>
  );
}