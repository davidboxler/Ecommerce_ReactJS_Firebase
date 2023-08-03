import { createAction } from "../../utils/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSingInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SING_IN_START);

export const emailSingInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SING_IN_START, { email, password });

export const singInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SING_IN_FAILED, error);

export const singInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SING_IN_SUCCESS, user);

export const singUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.SING_UP_START, {
    email,
    password,
    displayName,
  });

export const singUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SING_UP_SUCCESS, {
    user,
    additionalDetails,
  });

export const singUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SING_UP_FAILED, error);

export const singOutStart = () =>
  createAction(USER_ACTION_TYPES.SING_OUT_START);

export const singOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SING_OUT_SUCCESS);

export const singOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SING_OUT_FAILED, error);
