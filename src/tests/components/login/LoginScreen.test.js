import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Testing the <LoginScreen />', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call the dispatch and the navigate methods', () => {
    const handleClick = wrapper.find('button').prop('onClick');

    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalled();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: 'Felipaoooo',
      },
    });

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/marvel', { replace: true });

    localStorage.setItem('lastPath', '/search');

    handleClick();

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/search', { replace: true });
  });
});
