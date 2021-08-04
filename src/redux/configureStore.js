import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import createElectronStorage from 'redux-persist-electron-storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './rootReducer'

const ElectronStore = require('electron-store')

const electronStore = new ElectronStore()

const transform = createTransform(
  // transform state on its way to being serialized and persisted.
  inboundState => {
    // console.log(inboundState);
    // TODO: refactor
    const downloads = JSON.parse(JSON.stringify(inboundState))
    for (const courseid in downloads) {
      downloads[courseid].downloadInstance = null
      downloads[courseid].status = null
    }
    return downloads
  },
  outboundState => outboundState,
  { whitelist: ['downloads'] }
)

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(electronStore),
  blacklist: ['courses', 'dashboard'],
  transforms: [transform],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk)) // logger

const persistor = persistStore(store)

// persistor.purge()

export { store, persistor }
