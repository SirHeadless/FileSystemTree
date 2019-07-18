import { createAction } from "redux-actions";

export namespace AddFileSystemToggleActions {
    export enum Type {
        TOGGLE = 'TOGGLE'
    }

    export const toggleAddFileSystem = createAction(Type.TOGGLE);
}

export type AddFileSystemToggleActions = Omit<typeof AddFileSystemToggleActions, 'Type'>
