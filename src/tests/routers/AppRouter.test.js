import { AppRouter } from '../../routers/AppRouter';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';

describe('Testing the AppRouter', () => {
  test('should render the LoginScreen if the user is not authenticated', () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('Login Screen');
  });

  test('should render the MarvelScreen if the user is authenticated', () => {
    const contextValue = {
      user: {
        logged: true,
        name: 'Fulano',
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar').exists()).toBe(true);
    expect(wrapper.find('h1').text().trim()).toBe('Marvel Screen');
    expect(wrapper.find('span').text().trim()).toBe('Fulano');
  });
});
