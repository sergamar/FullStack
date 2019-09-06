
export const set = (notif, timeout) => {
    const sleep = require('util').promisify(setTimeout)
    return async dispatch => {
        dispatch({
            type: "SETNOT",
            notif: notif
        })
        await sleep(timeout*1000)
        dispatch({
            type: "REMOVE"
        })
    }
}

export const remove = () => {
    return({
        type: "REMOVE"
    })
}

const initialState = ""
const reducer = (state= initialState, action) => {
    switch(action.type) {
        case "SETNOT":
            return action.notif
        case "REMOVE":
            return ""
        default:
            return ""
    }
}

export default reducer