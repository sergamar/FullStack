export const set = ((filter) => {
    return({
        type: "SET",
        filter: filter
    })
}
)

const initialState = ""
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET":
            return action.filter
        default:
            return state
    }
}

export default reducer