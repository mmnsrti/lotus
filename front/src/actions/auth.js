import * as api from '../api'
import { AUTH} from '../constants/actionTypes'

export const signin =( data,navigate)=> async( dispatch) => {
    try {
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
export const signup =( data,navigate)=> async( dispatch) => {
    try {
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

