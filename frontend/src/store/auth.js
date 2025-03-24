import { create } from "zustand"
import { mountStoreDevtool } from "simple-zustand-devtools"


const useAuthStore = crerate((set, get) => ({
    allUserDate: null,
    loading: false,

    user: () => ({
        user_id: get().allUserDate?.user_id || null,
        username: get().allUserDate?.username || null,
    }),
    
    setUser: (user) => set({ allUserDate: user }),
    setLoading: (loading) => set({ loading }),
    setLoggedIn: () => get().allUserDate !== null,
    
}))

if(import.meta.env.DEV){
    mountStoreDevtool("Store", useAuthStore)
}

export { useAuthStore }