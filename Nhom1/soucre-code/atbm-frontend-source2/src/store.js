import rootReducer from './store/reducers/rootReducer'
import { createStore } from 'redux'

const store = createStore(rootReducer)

export default store