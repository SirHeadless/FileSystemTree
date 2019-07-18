import { handleActions } from "redux-actions";
import { AddFileSystemToggleActions } from "app2/actions/addFileSystemToggle";

const initalState = true;

export const addFileSystemToggleReducer = handleActions<Boolean, Boolean>(
    {
        [AddFileSystemToggleActions.Type.TOGGLE]: (state) => {
            return !state;
        }
    },
    initalState
);
