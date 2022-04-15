import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroScreen } from '../../../components/hero/HeroScreen';
import { heroes } from '../../../data/heroes';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Testing the <HeroScreen /> component', () => {
  test('should not show the HeroScreen if there is not a hero in the URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <Routes>
          <Route path="/hero" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('h1').text().trim()).toBe('No hero Page');
  });

  test('should show the HeroScreen if there is a hero in the URL', () => {
    const { id, superhero, characters } = heroes[0];

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/hero/${id}`]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('h3').text().trim()).toBe(superhero);
    expect(wrapper.find('p').text().trim()).toBe(characters);
  });

  test('should call the useNavigate hook when the back button is clicked', () => {
    const { id } = heroes[0];

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/hero/${id}`]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click');

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('should show the No hero Page if there is not a valid hero in the URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/hero/not-valid-hero-id`]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.text().trim()).toBe('No hero Page');
    expect(wrapper.find('h1').text().trim()).toBe('No hero Page');
  });
});
