import {
    TOGGLE_SEARCH_BOX_FOCUS,
    GET_TRENDINGS,
    ROTATE_PAGE,
    TOGGLE_MOUSE_IN_OUT
} from "./actions";
export const toggleSearchBoxFocus = () => ({
    type: TOGGLE_SEARCH_BOX_FOCUS
});

export const fetchTrendings = () => ({
    type: GET_TRENDINGS
})

export const rotatePage = () => ({
    type: ROTATE_PAGE
})

export const toggleMouseInOut = () => ({
    type: TOGGLE_MOUSE_IN_OUT
})