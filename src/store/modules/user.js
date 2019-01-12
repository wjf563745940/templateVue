import * as actions from './user/actions';
import mutations from './user/mutation';
import getters from './user/getters';

let state = {
  userInfo: {
  name: '',
  tel: '',
    isAuth: false,
isReg: false
}
};
export default {
  state,
  getters,
  actions,
  mutations
};
