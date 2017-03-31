import {createStore} from 'redux'
import {applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/lyrics-reducer'

const middleLogger  = applyMiddleware(createLogger,thunkMiddleware);

export default createStore(reducer, middleLogger)
