import { defineStore } from "pinia";

export interface UserState {
    token: LoginInfo;
}

const useUserStore = defineStore("user", {
    state: () => {
        return <UserState>{
            token: {}
        };
    },
    persist: true
});

export default useUserStore;
