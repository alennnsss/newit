
<template>
    <aside>
        <div class="sidebar-article">
            <img class="sidebar-image" src="../assets/knewit1.png" alt="K image">
            <h1>KnewIT</h1>
        </div>
        <div class="sidebar-icons">
            <div class="icons">
                <span>S E L L</span>
                <div
                    class="icons-box"
                    v-for="icon in sell"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.name">
                    </div>
                    <p>{{ icon.name }}</p>
                </div>
            </div>
            <div class="icons">
                <span>S E R V E</span>
                <div
                    class="icons-box"
                    v-for="icon in serve"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.name">
                    </div>
                    <p>{{ icon.name }}</p>
                </div>
            </div>
            <div class="icons">
                <span>B I L L</span>
                <div
                    class="icons-box"
                    v-for="icon in bill"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.name">
                    </div>
                    <p>{{ icon.name }}</p>
                </div>
            </div>
            <div class="icons">
                <span>R U N</span>
                <div
                    class="icons-box"
                    v-for="icon in run"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.name">
                    </div>
                    <p>{{ icon.name }}</p>
                </div>
            </div>
            <div class="border"></div>
            <div class="icons-box" v-for="link in links" :key="link.id">
                <div class="icon-wrap">
                    <img :src="link.image" :alt="link.name">
                </div>
                <p>{{ link.name }}</p>
            </div>
        </div>
    </aside>
</template>

<style scoped>
    aside {
        width: 20%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 30px;
        border-right: 1px solid #e5e5e5;
        background-color: #fff;
    }
    .sidebar-article {
        display: flex;
        gap: 10px;
    }
    h1 {
        font-size: 16px;
        margin-top: 10px;
        font-weight: 400;
        color: #4d4dff;
    }
    .sidebar-icons {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .sidebar-image {
        width: 36px;
        margin-left: -7px;
        border-radius: 8px;
        height: 36px;
    }
    span {
        font-weight: 600;
        font-size: 11px;
        letter-spacing: 1px;
        color: #9a9a9a;
    }
    .icons {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .icons-box {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #4a4a4a;
        cursor: pointer;
        padding: 6px 8px;
        border-radius: 8px;
        transition: background-color 0.15s ease, color 0.15s ease;
    }
    .icons-box:hover {
        background-color: #f2f2f5;
    }
    .icons-box.active {
        background-color: #4d4dff;
        color: #ffffff;
    }
    .icons-box p {
        font-size: 14px;
    }
    .icon-wrap {
        width: 26px;
        height: 26px;
        flex-shrink: 0;
        border-radius: 6px;
        background-color: #d9d9df;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s ease;
    }
    .icon-wrap img {
        width: 15px;
        height: 15px;
        display: block;
    }
    .icons-box:hover .icon-wrap {
        background-color: #c3c3ce;
    }
    .icons-box.active .icon-wrap {
        background-color: rgba(255, 255, 255, 0.25); 
    }

    .border {
        border-bottom: 1px solid #e5e5e5;
        margin: 4px 0;
    }
</style>

<script setup>
import { ref } from 'vue';

import Sun from '../assets/sun.png';
import Grid from '../assets/grid.png';
import Ai from '../assets/ai-ac.png';
import Building from '../assets/building.png';
import Profile from '../assets/profile-2user.png';
import Goals from '../assets/enhance-prize.png'
import Tick from '../assets/clipboard-tick.png';
import Tickets from '../assets/lifebuoy.png';
import Base from '../assets/book-open.png';
import Documents from '../assets/document.png';
import Invoices from '../assets/invoices.png';
import Timesheet from '../assets/timesheet.png';
import Team from '../assets/team.png';
import Settings from '../assets/settings.png';
import Help from '../assets/help.png';
import Notifications from '../assets/notification.png'
import Your from '../assets/profile.png'
import Search from '../assets/user-search.png'

// какой пункт подсвечен активным (по умолчанию — Contacts, как на скрине)
const activeItem = ref('Contacts');
function setActive(name) {
    activeItem.value = name;
}

const sell = [
    { id: 1, icon: Sun, name: 'Today' },
    { id: 2, icon: Grid, name: 'Grid' },
    { id: 3, icon: Ai, name: 'Leads' },
    { id: 4, icon: Building, name: 'Accounts' },
    { id: 5, icon: Profile, name: 'Contacts' },
    { id: 6, icon: Goals, name: 'Goals' }
]
const serve = [
    { id: 1, icon: Tick, name: 'Tasks' },
    { id: 2, icon: Tickets, name: 'Tickets' },
    { id: 3, icon: Base, name: 'Knowledge base' },
    { id: 4, icon: Documents, name: 'Documents' },
]
const bill = [
    { id: 1, icon: Invoices, name: 'Invoices' },
    { id: 2, icon: Timesheet, name: 'Timesheet' },
]
const run = [
    { id: 1, icon: Team, name: 'Team and access' },
    { id: 2, icon: Settings, name: 'Settings' },
]
const links = [
    { id: 1, image: Search, name: 'Search' },
    { id: 2, image: Notifications, name: 'Notification' },
    { id: 3, image: Your, name: 'Your profile' },
    { id: 4, image: Help, name: 'Help' }
]
</script>