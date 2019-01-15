
import React from 'react'

import { ThemeContext, themes } from '../components/theme/ThemeContext';
import ThemedButton from '../components/theme/ThemedButton';
import ThemeTogglerButton from '../components/theme/ThemeTogglerButton';

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class theme extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // The entire state is passed to the provider
    return (
      <div>
        <ThemeContext.Provider value={this.state}>
          <Content />
        </ThemeContext.Provider>
        <div>
          <Toolbar changeTheme={this.toggleTheme} />
        </div>
      </div>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}


export default theme