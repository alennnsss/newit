<!-- <template>
    <main>
        <div class="header">
            <div class="search">
                <div class="intro">
                    <p>Contacts</p>
                    <span>2 people</span>
                </div>    
                <div class="search-input">
                    <input type="text" placeholder="Search for contacts" class='input'>
                    <button class="button">
                        <img src="../assets/search.png" alt="search" class="search-image">
                    </button>
                </div>
            </div>
            <div class="button-box">
                <button class="inactive">Show inactive</button>
                <button class="contact">+  New contact</button>
            </div>
        </div>
        <div class="contacts">
            <div class="select-box">
                <Select :v-model="selectedStatus"
                    :options="status"
                    optionLabel="name"
                    placeholder="Select a status"
                />
                <button class="filter">+ Filter</button>
            </div>
            <div class="most">
                <span>Most recently added first</span>
            </div>
        </div>
       <div class="contacts-page">
    <div class="table-wrapper">
        <table class="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account</th>
                <th>Reachable on</th>
                <th>Email</th>
                <th>Owner</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>
                <tr v-for="contact in contacts" :key="contact.id">
                    <td>
                        <div class="name-cell">
                            <div class="avatar">
                              {{ contact.initials }}
                            </div>

                            <div>
                                <div class="contact-name">
                                {{ contact.name }}
                            </div>

                            <div class="contact-title">
                                {{ contact.title }}
                            </div>
                        </div>
                      </div>
                    </td>

                    <td class="muted">
                      {{ contact.account }}
                    </td>

                    <td>
                        <span v-if="contact.phone" class="phone">
                            {{ contact.phone }}
                        </span>

                        <span v-else class="muted">
                            No phone
                        </span>
                    </td>

                    <td>
                        <span v-if="contact.email" class="email">
                            {{ contact.email }}
                        </span>

                        <span v-else class="muted">
                            No email
                        </span>
                    </td>

                    <td>
                      {{ contact.owner }}
                    </td>

                    <td class="updated">
                      {{ contact.updated }}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
    <div class="showing">
        <span>Showing {{ contacts.length }} of {{ contacts.length }}</span>
    </div>
    </main>    
</template>

<script setup>
import Select from 'primevue/select';
import { ref } from 'vue';

const selectedStatus = ref(null)
const status = [
    {
        name: 'Active contacts',
        code: 'AC'
    }, 
    {
        name: 'Disactive contacts',
        code: 'DS'
    }
]
const contacts = [
    {
        id: 1, 
        name: 'Имя',
        account: '--',
        owner: 'Unassigned',
        updated: '8 days ago'
    }
]
</script>

<style scoped>
    main {
        padding: 30px;
        width: 80%;
    }
    .header {
        display: flex;
        justify-content: space-between;
    }
    .intro {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    p {
        font-size: 30px;
        font-size: 400;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        color: #67676766;
    }
    .button {
        cursor: pointer;
        border: none;
    }
    .button-box {
        display: flex;
        gap: 8px;
    }
    .search-input {
        background-color: white;
        padding: 16px;
        border-radius: 20px;
        height: 50px;
        width: 150%;
        display: flex;
        gap: 20px;
    }
    .inactive {
        max-width: 120px;
        width: 100%;
        border: none;
        background-color: white;
        border-radius: 10px;
        height: 36px;
        font-weight: 300;
        font-size: 12px;
    }
    .contact {
        height: 36px;
        width: 100%;
        max-width: 200px;
        border-radius: 10px;
        background-color: rgb(86, 86, 255);
        color: white;
        border:none;
    }
    .search {
        display: flex;
        gap: 20px;
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
        width: 60px;
        border: none;
        background-color: white;
        height: 30px;
        margin-top: 4px;
    }
    .contacts {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .select-box {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    .table {
        background-color: white;
        border-radius: 8px;
        padding: 10px;
    }
    .table p {
        font-size: 12px;
        color: #2a2a2a;
    }

    .contacts-page {
      background: white;
      border: 1px solid #0a0a0a;
      border-radius: 16px;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    button {
        cursor: pointer;
    }
    .table-wrapper {
      background: white;
      border-radius: 20px;
      overflow: hidden;
    }

    .contacts-table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 18px;
      color: #777;
      font-weight: normal;
      border-bottom: 1px solid #eee;
    }

    td {
      padding: 15px 18px;
      border-bottom: 1px solid #eee;
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
      background: #eeeeff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
    }

    .contact-name {
      font-weight: bold;
    }

    .contact-title {
      color: #999;
      margin-top: 4px;
    }

    .muted {
      color: #999;
    }
    .filter-btn,
    .more-btn {
      padding: 10px 15px;
      margin-right: 10px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 10px;
    }
    .showing {
        margin-top: 10px;
    }
    .input { 
        padding: 20px;
        height: 40px;
        border: none;
        background-color: white;
        margin-top: -11px;

    }
</style> -->
<template>
    <main>
        <div class="header">
            <div class="search">
                <div class="intro">
                    <p>Contacts</p>
                    <span>{{ contacts.length }} people</span>
                </div>
                <div class="search-input">
                    <input type="text" placeholder="Search for contacts" class='input'>
                    <button class="button">
                        <img src="../assets/search.png" alt="search" class="search-image">
                    </button>
                </div>
            </div>
            <div class="button-box">
                <button class="inactive">Show inactive</button>
                <button class="contact">+  New contact</button>
            </div>
        </div>
        <div class="contacts">
            <div class="select-box">
                <Select :v-model="selectedStatus"
                    :options="status"
                    optionLabel="name"
                    placeholder="Select a status"
                />
                <button class="filter">+ Filter</button>
            </div>
            <div class="most">
                <span>Most recently added first</span>
            </div>
        </div>
       <div class="contacts-page">
    <div class="table-wrapper">
        <table class="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account</th>
                <th>Reachable on</th>
                <th>Email</th>
                <th>Owner</th>
                <th>Updated</th>
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

                    <td class="muted">
                      {{ contact.account }}
                    </td>

                    <td>
                        <span v-if="contact.phone" class="phone">
                            {{ contact.phone }}
                        </span>

                        <span v-else class="muted">
                            No phone
                        </span>
                    </td>

                    <td>
                        <span v-if="contact.email" class="email">
                            {{ contact.email }}
                        </span>

                        <span v-else class="muted">
                            No email
                        </span>
                    </td>

                    <td>
                        <span v-if="contact.owner === 'Unassigned'" class="badge-warning">
                            Unassigned
                        </span>
                        <span v-else>
                            {{ contact.owner }}
                        </span>
                    </td>

                    <td class="updated muted">
                      {{ contact.updated }}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
    <div class="showing">
        <span>Showing {{ contacts.length }} of {{ contacts.length }}</span>
    </div>
    </main>
</template>

<script setup>
import Select from 'primevue/select';
import { ref } from 'vue';

const selectedStatus = ref(null)
const status = [
    { name: 'Active contacts', code: 'AC' },
    { name: 'Disactive contacts', code: 'DS' }
]
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
    }
    .header {
        display: flex;
        justify-content: space-between;
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
        padding: 16px;
        border-radius: 20px;
        height: 50px;
        width: 150%;
        display: flex;
        gap: 20px;
        border: 1px solid #e5e5e5;
    }
    .inactive {
        max-width: 120px;
        width: 100%;
        border: 1px solid #e5e5e5;
        background-color: white;
        border-radius: 10px;
        height: 36px;
        font-weight: 500;
        font-size: 12px;
        color: #4a4a4a;
    }
    .contact {
        height: 36px;
        width: 100%;
        max-width: 200px;
        border-radius: 10px;
        background-color: #4d4dff;
        color: white;
        border: none;
        font-weight: 500;
    }
    .search {
        display: flex;
        gap: 20px;
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
        width: 60px;
        border: 1px solid #e5e5e5;
        background-color: white;
        height: 30px;
        margin-top: 4px;
        color: #4a4a4a;
    }
    .contacts {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .select-box {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .contacts-page {
      background: white;
      border: 1px solid #e5e5e5; 
      border-radius: 16px;
      padding: 20px;
      font-family: Arial, sans-serif;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    button {
        cursor: pointer;
    }
    .table-wrapper {
      background: white;
      border-radius: 20px;
      overflow: hidden;
    }

    .contacts-table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 18px;
      color: #8a8a8a;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 1px solid #eee;
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
        padding: 20px;
        height: 40px;
        border: none;
        background-color: white;
        margin-top: -11px;
    }
</style>