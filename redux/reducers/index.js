import {combineReducers} from 'redux';
import auth from './auth';
import responLogin from './responLogin';
import history from './history';

export default combineReducers({auth, history, responLogin});
