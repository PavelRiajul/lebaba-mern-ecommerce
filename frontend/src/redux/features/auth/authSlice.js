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
})