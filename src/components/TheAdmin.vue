<template>
    <main>
        <div class="header">
            <div class="search">
                <div class="intro">
                    <p>{{ t('contacts.title') }}</p>
                    <span>{{ t('contacts.peopleCount', { count: contacts.length }) }}</span>
                </div>
                <div class="search-input">
                    <input v-model="nameContact" type="text" :placeholder="t('contacts.searchPlaceholder')" class='input'>
                    <button class="button">
                        <img src="../assets/search.png" :alt="t('sidebar.links.search')" class="search-image">
                    </button>
                </div>
            </div>
            <div class="button-box">
                <button class="inactive">{{ t('contacts.showInactive') }}</button>
                <button class="contact" @click="openContactForm">{{ t('contacts.newContact') }}</button>
            </div>
        </div>
        <div class="contacts">
            <div class="select-box">
                <Select :v-model="selectedStatus"
                    :options="status"
                    optionLabel="name"
                    :placeholder="t('contacts.statusPlaceholder')"
                />
                <button class="filter">{{ t('contacts.filter') }}</button>
            </div>
            <div class="most">
                <span>{{ t('contacts.sortLabel') }}</span>
            </div>
        </div>
       <div class="contacts-page">
            <div class="table-wrapper">
                <table class="contacts-table">
                    <thead>
                      <tr>
                        <th>{{ t('contacts.table.name') }}</th>
                        <th class="hide-sm">{{ t('contacts.table.account') }}</th>
                        <th class="hide-sm">{{ t('contacts.table.reachableOn') }}</th>
                        <th class="hide-md">{{ t('contacts.table.email') }}</th>
                        <th class="hide-md">{{ t('contacts.table.owner') }}</th>
                        <th class="hide-md">{{ t('contacts.table.updated') }}</th>
                      </tr>
                    </thead>

                    <tbody>
                        <tr v-for="contact in filteredContacts" :key="contact.id">
                            <td>
                                <div class="name-cell">
                                    <div class="avatar" :style="{ backgroundColor: avatarColor(contact.name) }">
                                      {{ initials(contact.name) }}
                                    </div>

                                    <div>
                                        <div class="contact-name">
                                        {{ contact.name }}
                                    </div>

                                    <div class="contact-title" v-if="contact.title">
                                        {{ contact.title }}
                                    </div>
                                </div>
                              </div>
                            </td>

                            <td class="muted hide-sm">
                              {{ contact.account }}
                            </td>

                            <td class="hide-sm">
                                <span v-if="contact.phone" class="phone">
                                    {{ contact.phone }}
                                </span>

                                <span v-else class="muted">
                                    {{ t('contacts.noPhone') }}
                                </span>
                            </td>

                            <td class="hide-md">
                                <span v-if="contact.email" class="email">
                                    {{ contact.email }}
                                </span>

                                <span v-else class="muted">
                                    {{ t('contacts.noEmail') }}
                                </span>
                            </td>

                            <td class="hide-md">
                                <span v-if="contact.owner === 'Unassigned'" class="badge-warning">
                                    {{ t('contacts.unassigned') }}
                                </span>
                                <span v-else>
                                    {{ contact.owner }}
                                </span>
                            </td>

                            <td class="updated muted hide-md">
                              {{ contact.updated }}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    <div class="showing">
        <span>{{ t('contacts.showing', { shown: filteredContacts.length, total: contacts.length }) }}</span>
    </div>

    <Teleport to="body">
        <div v-if="isFormOpen" class="modal-overlay" @click.self="closeContactForm">
            <div class="modal-card">
                <div class="modal-header">
                    <h2>{{ t('contacts.form.title') }}</h2>
                    <button class="modal-close" @click="closeContactForm">&times;</button>
                </div>

                <form class="modal-form" @submit.prevent="submitContact">
                    <label class="field">
                        <span>{{ t('contacts.form.nameLabel') }}</span>
                        <input v-model.trim="contactsStore.contactData.name" type="text" @blur="v$.name.$touch()"  :placeholder="t('contacts.form.namePlaceholder')">
                        <span class="error-msg" v-if="v$.name.$error">
                            {{ v$.name.$errors[0].$message }}
                        </span>
                    </label>

                    <label class="field">
                        <span>{{ t('contacts.form.accountLabel') }}</span>
                        <input v-model.trim="contactsStore.contactData.account" @blur="v$.account.$touch()" type="text" :placeholder="t('contacts.form.accountPlaceholder')">
                        <span class="error-msg" v-if="v$.account.$error">
                            {{ v$.account.$errors[0].$message }}
                        </span>
                    </label>

                    <label class="field">
                        <span>{{ t('contacts.form.phoneLabel') }}</span>
                        <input v-model.trim="contactsStore.contactData.telephone" @blur="v$.telephone.$touch()" type="text" :placeholder="t('contacts.form.phonePlaceholder')">
                        <span class="error-msg" v-if="v$.telephone.$error">
                            {{ v$.telephone.$errors[0].$message }}
                        </span>
                    </label>

                    <label class="field">
                        <span>{{ t('contacts.form.emailLabel') }}</span>
                        <input v-model.trim="contactsStore.contactData.email" @blur="v$.email.$touch()" type="email" :placeholder="t('contacts.form.emailPlaceholder')">
                        <span class="error-msg" v-if="v$.email.$error">
                            {{ v$.email.$errors[0].$message }}
                        </span>
                    </label>

                    <label class="field">
                        <span>{{ t('contacts.form.ownerLabel') }}</span>
                        <input v-model.trim="contactsStore.contactData.owner" @blur="v$.owner.$touch()" type="text" :placeholder="t('contacts.form.ownerPlaceholder')">
                        <span class="error-msg" v-if="v$.owner?.$error">
                            {{ v$.owner.$errors[0].$message }}
                        </span>
                    </label>

                    <p v-if="formError" class="form-error">{{ formError }}</p>

                    <div class="modal-actions">
                        <button type="button" class="btn-cancel" @click="closeContactForm">
                            {{ t('contacts.form.cancel') }}
                        </button>
                        <button type="submit" @click="submitForm" class="btn-save">
                            {{ t('contacts.form.save') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
    </main>
</template>

<script setup>
import Select from 'primevue/select';
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useContactsStore } from '../stores/useContactStore';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength, email } from '@vuelidate/validators';

const contactsStore = useContactsStore();

const { t } = useI18n();
const selectedStatus = ref(null)
const nameContact = ref('');

const status = computed(() => [
    { name: t('contacts.status.active'), code: 'AC' },
    { name: t('contacts.status.inactive'), code: 'DS' }
])

const rules = {
    name: {
        required: helpers.withMessage(
            'Name is required',
            required
        ),
        minLength: helpers.withMessage(
            'Name should be at least 2 symbols',
            minLength(2)
        )
    },

    account: {
        required: helpers.withMessage(
            'Account is required',
            required
        ),
        minLength: helpers.withMessage(
            'Account should be at least 5 symbols',
            minLength(5)
        )
    },

    telephone: {
        required: helpers.withMessage(
            'Telephone number is required',
            required
        ),
        
    },

    email: {
        required: helpers.withMessage(
            'Email is required',
            required
        ),
        email: helpers.withMessage(
            'Wrong email',
            email
        )
    },
    owner: {
        required: helpers.withMessage(
            'Owner is required',
            required
        )
    }
}
const v$ = useVuelidate(rules, contactsStore.contactData)

const defaultContacts = [
    {
        id: 1,
        name: 'Talgat',
        account: 'Talgat123',
        owner: 'Unassigned',
        updated: '8 days ago'
    },
    {
        id: 2,
        name: 'Alen',
        account: 'Alens342',
        owner: 'Unassigned',
        updated: '1 month ago'
    }
]

const savedContacts = localStorage.getItem('contacts')

const contacts = ref(
    savedContacts
        ? JSON.parse(savedContacts)
        : defaultContacts
)
const filteredContacts = computed(() => {
    const query = nameContact.value.trim().toLowerCase()
    if (!query) return contacts.value
    return contacts.value.filter((contact) =>
        contact.name.toLowerCase().includes(query)
    )
})

function initials(name) {
    if (!name) return '?';
    return name.trim().slice(0, 2).toUpperCase();
}

const avatarPalette = ['#FFD6A5', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF', '#FDFFB6'];
function avatarColor(name) {
    if (!name) return '#eeeeff';
    const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return avatarPalette[hash % avatarPalette.length];
}

const isFormOpen = ref(false)
const formError = ref('')

function openContactForm() {
    Object.assign(contactsStore.contactData, {
        name: '',
        account: '',
        telephone: '',
        email: '',
        owner: ''
    })  
    formError.value = ''
    isFormOpen.value = true
}

function closeContactForm() {
    isFormOpen.value = false
}

async function submitContact() {
    const isValid = await v$.value.$validate()
    if (!isValid) {
        return 
    }
    contacts.value.push({
        id: contacts.value.length
            ? Math.max(...contacts.value.map(c => c.id)) + 1
            : 1,
        name: contactsStore.contactData.name,
        account: contactsStore.contactData.account,
        phone: contactsStore.contactData.telephone,
        email: contactsStore.contactData.email,
        owner: contactsStore.contactData.owner || 'Unassigned',
        updated: t('contacts.form.justNow')
    })
    
    localStorage.setItem(
        'contacts',
        JSON.stringify(contacts.value)
    )
    v$.value.$reset()
    closeContactForm()
}
</script>

<style scoped>
    main {
        padding: 30px;
        width: 80%;
        box-sizing: border-box;
        overflow-x: hidden;
        min-height: 100vh;
    }
    .header {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
    }
    .intro {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    p {
        font-size: 30px;
        font-weight: 400;
        color: #1a1a1a;
    }
    span {
        font-weight: 600;
        font-size: 14px;
        color: #767676;
    }
    .button {
        cursor: pointer;
        border: none;
        background: transparent;
        margin-top: 8px;
    }
    .button-box {
        display: flex;
        gap: 8px;
    }
    .search-input {
        background-color: white;
        padding: 0 16px;
        border-radius: 20px;
        height: 50px;
        width: 100%;
        max-width: 420px;
        display: flex;
        align-items: center;
        gap: 20px;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        overflow: hidden;
    }
    .inactive {
        padding: 0 16px;
        border: 1px solid #e5e5e5;
        background-color: white;
        border-radius: 10px;
        height: 36px;
        font-weight: 500;
        font-size: 12px;
        color: #4a4a4a;
        white-space: nowrap;
    }
    .today-arrow {
        color: var(--text-muted);
        cursor: pointer;
        height: 10px;
    }
    .contact {
        height: 36px;
        padding: 0 16px;
        border-radius: 10px;
        background-color: #4d4dff;
        color: white;
        border: none;
        font-weight: 500;
        white-space: nowrap;
    }
    .search {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }
    .search-image {
        width: 26px;
        height: 26px;
        margin-top: -5px;
    }
    .most {
        margin-top: 20px;
    }
    .filter {
        border-radius: 8px;
        padding: 0 16px;
        border: 1px solid #e5e5e5;
        background-color: white;
        height: 40px;
        color: #4a4a4a;
        white-space: nowrap;
    }
    .contacts {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }
    .select-box {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    .contacts-page {
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 16px;
      padding: 20px;
      font-family: Arial, sans-serif;
      overflow: hidden;
      box-sizing: border-box;
    }
    button {
        cursor: pointer;
    }
    .table-wrapper {
      background: white;
      border-radius: 20px;
      overflow-x: auto;
      width: 100%;
      box-sizing: border-box;
    }
    .contacts-table {
      width: 100%;
      min-width: 600px;
      border-collapse: collapse;
    }
    th {
      text-align: left;
      padding: 18px;
      color: #8a8a8a;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 1px solid #eee;
      white-space: nowrap;
    }
    td {
      padding: 15px 18px;
      border-bottom: 1px solid #eee;
      color: #2a2a2a;
    }
    tbody tr:hover {
      background-color: #fafafa;
    }
    .name-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-weight: 600;
      font-size: 13px;
    }
    .contact-name {
      font-weight: bold;
      color: #1a1a1a;
    }
    .contact-title {
      color: #9a9a9a;
      margin-top: 4px;
    }
    .muted {
      color: #9a9a9a;
    }
    .badge-warning {
      display: inline-block;
      background: #FFF4E5;
      color: #B54708;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
    }
    .showing {
        margin-top: 10px;
    }
    .input {
        padding: 0;
        height: 100%;
        border: none;
        background-color: transparent;
        width: 100%;
        outline: none;
        font-size: 14px;
    }

    @media (max-width: 1024px) {
        main {
            width: 75%;
            padding: 20px;
        }
        .search-input {
            width: 100%;
        }
    }

    @media (max-width: 768px) {
        main {
            width: 100%;
            padding: 16px;
            padding-top: 100px;
        }
        .header {
            flex-direction: column;
            align-items: stretch;
        }
        .contact {
            flex: 1;
        }
        .inactive {
            flex: 1;
        }

        .contacts-page {
            display: flex;
            flex-direction: column;
        }
    }

    @media (max-width: 480px) {
        main {
            padding: 12px;
        }
        p {
            font-size: 22px;
        }
        .contacts-page {
            padding: 10px;
            border-radius: 12px;
        }

        .name-cell {
            gap: 8px;
        }
        .avatar {
            width: 32px;
            height: 32px;
            font-size: 11px;
        }
    }

    .modal-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 16px;
        box-sizing: border-box;
    }
    .modal-card {
        background-color: #ffffff;
        border-radius: 16px;
        width: 100%;
        max-width: 440px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 24px;
        box-sizing: border-box;
    }
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    .modal-header h2 {
        font-size: 20px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
    }
    .modal-close {
        border: none;
        background: transparent;
        font-size: 22px;
        line-height: 1;
        color: #9a9a9a;
        cursor: pointer;
        padding: 4px;
    }
    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
    .field {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-size: 13px;
        font-weight: 600;
        color: #4a4a4a;
    }
    .field input {
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 14px;
        font-family: inherit;
        font-weight: 400;
        color: #1a1a1a;
        outline: none;
        box-sizing: border-box;
    }
    .field input:focus {
        border-color: #4d4dff;
    }
    .form-error {
        color: #B54708;
        font-size: 13px;
        margin: -4px 0 0 0;
    }
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 8px;
    }
    .btn-cancel {
        padding: 10px 18px;
        border-radius: 10px;
        border: 1px solid #e5e5e5;
        background-color: #ffffff;
        color: #4a4a4a;
        font-weight: 500;
        cursor: pointer;
    }
    .btn-save {
        padding: 10px 18px;
        border-radius: 10px;
        border: none;
        background-color: #4d4dff;
        color: #ffffff;
        font-weight: 500;
        cursor: pointer;
    }
    .error-msg {
        color: red;
        font-size: 12px;
    }
</style>