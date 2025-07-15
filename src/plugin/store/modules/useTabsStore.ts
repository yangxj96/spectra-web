import { defineStore } from "pinia";

const useTabsStore = defineStore("tabs", {
    state: () => ({
        tabs: [],
        active: undefined as string | undefined
    })
});
export default useTabsStore;
