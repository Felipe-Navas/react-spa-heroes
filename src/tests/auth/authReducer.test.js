import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Testing the authReducer', () => {
  test('should return the default state', () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test('should authenticate and put the "name" of the user', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Felipao',
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({ logged: true, name: 'Felipao' });
  });

  test('should logout the user and delete the name of the state', () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer({ logged: true, name: 'Felipao' }, action);
    expect(state).toEqual({ logged: false });
  });
});
