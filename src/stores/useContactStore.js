import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useContactsStore = defineStore('contacts', () => {

    const contactData = reactive({
        name: '',
        account: '',
        telephone: '',
        email: '',
        owner: '',
        updated: '',
    })

    return {
        contactData
    }
})