import { all, call, put, takeLatest } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { singInFailed, singInSuccess, singOutFailed, singOutSuccess, singUpFailed, singUpSuccess } from "./user.action";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signOutUser,
  singInAuthUserWithEmailAndPassword,
} from "../../services/firebase";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(singInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(singInFailed(error));
  }
}

export function* singInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    if (!user) return;
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(singInFailed(error));
  }
}

export function* singInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      singInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(singInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(singInFailed(error));
  }
}

export function* singUp({payload: {email, password, displayName}}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(singUpSuccess(user, {displayName}));
  } catch (error) {
    yield put(singUpFailed(error));
  }
}

export function* singOut() {
  try {
    yield call(signOutUser)
    yield put(singOutSuccess());
  } catch (error) {
    yield put(singOutFailed(error));
  }
}

export function* singInAfterSingUp({payload: {user, additionalDetails}}) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSingInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SING_IN_START, singInWithGoogle);
}

export function* onEmailSingInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SING_IN_START, singInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSingUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SING_UP_START, singUp);
}

export function* onSingUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SING_UP_SUCCESS, singInAfterSingUp);
}

export function* onSingOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SING_OUT_START, singOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSingInStart),
    call(onGoogleSingInStart),
    call(onSingUpStart),
    call(onSingUpSuccess),
    call(onSingOutStart)
  ]);
}
