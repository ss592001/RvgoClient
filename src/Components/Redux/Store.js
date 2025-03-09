// store.js
import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const initialState = {
  Tab: "/user/dashboard",
  activeTest: null,
  answers: [],
  auth: null,
  timeTaken: '',
  startTime: '',
  testOtherDetails: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.Tab = action.payload;
    },
    setActiveTest: (state, action) => {
      state.activeTest = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setTimeTaken: (state, action) => {
      state.timeTaken = action.payload;
    },
    setTestStartTIme: (state, action) => {
      state.startTime = action.payload;
    },
    setTestOtherDetails: (state, action) => {
      state.testOtherDetails = action.payload;
    },
  },
});

export const { setTab, setActiveTest, setAnswers, setAuth, setTimeTaken, setTestStartTIme, setTestOtherDetails } = userSlice.actions;

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const persistConfig = {
  key: "persist-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export { store, persistor };
