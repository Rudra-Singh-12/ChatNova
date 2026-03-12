import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    authUser: {name : "John" , _id: 123 , age: 25},
    isLoading: true,
    isLoggedIn: false,
     
    login: ()=>{
        console.log("We just logged in.")
        set({isLoggedIn: true})
    }
}))