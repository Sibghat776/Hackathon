import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city: undefined,
    date: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    }
}

export const SearchContext = createContext(INITIAL_STATE)

const searchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
            break;
        case "RESET_SEARCH":
            return INITIAL_STATE
            break;

        default:
            return state
            break;
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE)
    return <SearchContext.Provider value={{
        city: state.city,
        date: state.date,
        options: state.options,
        dispatch
    }}>
        {children}
    </SearchContext.Provider>
}