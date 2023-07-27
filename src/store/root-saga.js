
import { all, call } from 'react-saga/effects';

// export function* rootSaga() {}

import { categoriesSaga } from "./categories/category.saga";

export function* rootSaga() {
    yield all([call(categoriesSaga)])
}