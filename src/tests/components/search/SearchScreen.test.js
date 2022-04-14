import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Testing the <SearchScreen /> component', () => {
  test('should render correctly with default values', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Find a Hero');
  });

  test('should show Batman and the input with the value of the queryString', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper.find('.card').length).toBe(1);
    expect(wrapper.find('.card-title').text().trim()).toBe('Batman');
  });

  test('should show the error message when the hero is not found', () => {
    const query = 'notfound';
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${query}`]}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('notfound');
    expect(wrapper.find('.alert-danger').text().trim()).toBe(
      `No results: ${query}`
    );
  });

  test('should call the navigate method and show the new component', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <SearchScreen />
      </MemoryRouter>
    );

    const input = wrapper.find('input');
    input.simulate('change', {
      target: { name: 'searchText', value: 'batman' },
    });

    const form = wrapper.find('form');
    // * This is a valid way too, to call the submit method
    // form.simulate('submit', { preventDefault: () => {} });

    form.prop('onSubmit')({ preventDefault: () => {} });

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
  });
});
