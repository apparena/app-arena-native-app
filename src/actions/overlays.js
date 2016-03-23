import actionTypes from "./types";

export function addOverlay(id, component, blur = true) {
    return dispatch => {
        if (!document.body.classList.contains('modal-open')) {
            document.body.className = document.body.className + " modal-open";
        }
        document.body.onkeydown = function (e) {
            if (e.keyCode == 27) {
                dispatch(closeOverlay(id));
            }
        };
        dispatch({
            type: actionTypes.addOverlay,
            id,
            blur,
            component
        })
    };
}

export function closeOverlay(id) {
    document.body.className = document.body.className.replace(" modal-open", "");
    document.body.onkeydown = null;
    return {
        type: actionTypes.closeOverlay,
        id
    };
}
