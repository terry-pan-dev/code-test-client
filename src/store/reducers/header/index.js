import {
    TOGGLE_SEARCH_BOX_FOCUS,
    GET_TRENDINGS_SUCCESS,
    TOGGLE_MOUSE_IN_OUT,
    ROTATE_PAGE
} from "./actions";
import { fromJS } from 'immutable';
const defaultState = fromJS({
    focus: false,
    mouseIn: false,
    trendings: [],
    page: 0,
    totalPage: 1,
});

const headerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_SEARCH_BOX_FOCUS:
            return state.set('focus', !state.get('focus'));
        case GET_TRENDINGS_SUCCESS:
            return state.merge({
                'trendings': action.value,
                'totalPage': action.totalPage
            });
        case TOGGLE_MOUSE_IN_OUT:
            return state.set('mouseIn', !state.get('mouseIn'));
        case ROTATE_PAGE:
            let newPage = state.get('page') + 1;
            if (newPage > state.get('totalPage')) {
                newPage = 0;
            }
            return state.set('page', newPage % state.get('totalPage'));
        default:
            return state;
    }
};

export default headerReducer;