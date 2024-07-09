import adminReducers from './reducers/adminReducers'
import userReducers from './reducers/userReducers'
import postReducers from './reducers/postReducers'
import chatReducers from './reducers/chatReducers'
const rootReducers = {
    admin : adminReducers,
    user : userReducers,
    post : postReducers,
    chat : chatReducers,
}
export default rootReducers