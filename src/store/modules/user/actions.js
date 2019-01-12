// user
import * as types from '../../mutation-types';
export const updateUser = ({ commit }, message) => {
  commit(types.UPDATE_USER, message);
};