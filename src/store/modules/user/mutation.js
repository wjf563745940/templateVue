import * as types from '../../mutation-types';
export default {
  [types.UPDATE_USER](state, message) {
    state.userInfo = message;
  }
};
