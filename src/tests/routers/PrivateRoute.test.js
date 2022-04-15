import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <span>Redirect component</span>,
}));

describe('Testing the <PivateRoute /> component', () => {
  Storage.prototype.setItem = jest.fn();

  test('should render the component if the user is authentiticated and save the localstorage', () => {
    const contextValue = {
      user: {
        logged: true,
        name: 'John Doe',
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe('Private Component');
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('lastPath', '/');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
  });

  test('should not render the component if the user is not authentiticated', () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe('Redirect component');
  });
});
