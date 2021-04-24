import { combineReducers } from 'redux';
import headerReducer from './header';
import * as headerActions from './header/actionCreators';

export default combineReducers({
    header: headerReducer,
})

export {
    headerActions,
}