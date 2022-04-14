import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { heroes } from '../../data/heroes';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Testing the <DashboardRoutes /> component', () => {
  const contextValue = {
    user: {
      logged: true,
      name: 'John Doe',
    },
  };

  test('should render correctly - Marvel', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('John Doe');
    expect(wrapper.find('h1').text().trim()).toBe('Marvel Screen');
  });

  test('should render correctly - DC', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/dc']}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('John Doe');
    expect(wrapper.find('h1').text().trim()).toBe('DC Screen');
  });

  test('should render correctly - Search', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search']}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('John Doe');
    expect(wrapper.find('h1').text().trim()).toBe('Search');
  });

  test('should render correctly - Hero/id', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[`/hero/${heroes[0].id}`]}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('John Doe');
    expect(wrapper.find('h3').text().trim()).toBe(heroes[0].superhero);
  });
});
