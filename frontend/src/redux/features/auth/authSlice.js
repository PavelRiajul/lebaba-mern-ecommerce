import { createSlice } from '@reduxjs/toolkit'


const loadUserFromLocalStorage=()=>{
    try {
        const serializedState = localStorage.getItem('user');
        if(serializedState === null) return {user:null}
        return {user:JSON.parse(serializedState)}
    } catch (error) {
        return {user:null}
    }
}

const initialState= loadUserFromLocalStorage()
const authSlice = createSlice({
    name:'auth',
    initialState,
    //user set
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload.user;
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        //user logout
        logout:(state)=>{
            state.user = null;
            localStorage.removeItem('user')
        }
    }
})
export const {setUser,logout} = authSlice.actions;
export default authSlice.reducer;