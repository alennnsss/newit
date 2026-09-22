<template>
    <main>
        <div class="header">
            <div class="search">
                <div class="intro">
                    <p>{{ t('contacts.title') }}</p>
                    <span>{{ t('contacts.peopleCount', { count: contacts.length }) }}</span>
                </div>
                <div class="search-input">
                    <input type="text" :placeholder="t('contacts.searchPlaceholder')" class='input'>
                    <button class="button">
                        <img src="../assets/search.png" :alt="t('sidebar.links.search')" class="search-image">
                    </button>
                </div>
            </div>
            <div class="button-box">
                <button class="inactive">{{ t('contacts.showInactive') }}</button>
                <button class="contact">{{ t('contacts.newContact') }}</button>
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
                <tr v-for="contact in contacts" :key="contact.id">
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
        <span>{{ t('contacts.showing', { shown: contacts.length, total: contacts.length }) }}</span>
    </div>
    </main>
</template>

<script setup>
import Select from 'primevue/select';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const selectedStatus = ref(null)

const status = computed(() => [
    { name: t('contacts.status.active'), code: 'AC' },
    { name: t('contacts.status.inactive'), code: 'DS' }
])
const contacts = [
    {
        id: 1,
        name: 'Talgat',
        account: 'Talgat123',
        owner: 'Unassigned',
        updated: '8 days ago'
    }
]

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
        .hide-md {
            display: none;
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
        .hide-sm {
            display: none;
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
</style>