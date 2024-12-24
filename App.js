import React from 'react';

import {StatusBar, StyleSheet, useColorScheme} from 'react-native';

import {AuthProvider} from './src/providers/AuthProvider';
import {ThemeProvider} from './src/providers/ThemeProvider';
import Welcome from './src/pages/Welcome';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      {/*<StatusBar hidden={true}  />*/}
      <AuthProvider>
        <ThemeProvider>
          <Welcome />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
