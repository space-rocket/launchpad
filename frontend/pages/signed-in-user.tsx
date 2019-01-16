import React from 'react'

// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
  name: 'Guest',
});

export default class extends React.Component  {
  static async getInitialProps(ctx) {
    const token = ctx.query.token;
    console.log('token 😍:', token);
    const user = 'Mike'
    const theme = 'blue'
    return { user, theme }

  }
  render() {
    const context = this.context;
    console.log('this.props :', this.props)
    console.log('this.context', this.context)
    const { user, theme } = this.props;

    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={user}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Content />
    </div>
  );
}

// A component may consume multiple contexts
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <div>
              <ProfilePage user={user} theme={theme} />
              <ProfilePage2 user={user} theme={theme} />
            </div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

// function ProfilePage() {
//   console.log('this :', this)
//   return (
//     <section>
//       Hello World
//     </section>
//   )
// }

const ProfilePage = ({ user, theme }) => (
  <>
    <p>Name: {user}</p>
    <p>Speed: {theme}</p>
  </>
);

const ProfilePage2 = ({ user, theme }) => (
  <>
    <p>Name2: {user}</p>
    <p>Speed2: {theme}</p>
  </>
);