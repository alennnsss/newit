<template>
    <button class="menu-toggle" v-if="!isOpen" @click="isOpen = true">
        <span></span>
        <span></span>
        <span></span>
    </button>

    <div class="overlay" v-if="isOpen" @click="isOpen = false"></div>

    <aside :class="{ open: isOpen }">
        <div class="sidebar-article">
            <img class="sidebar-image" src="../assets/knewit1.png" alt="K image">
            <h1>KnewIT</h1>
            <div class="link">
                <router-link to="/user">
                    <img src="../assets/profile.png" class="profile" :alt="t('sidebar.links.yourProfile')">
                </router-link>
            </div>
        </div>
        <div class="lang-switch">
            <button
                v-for="l in supportedLocales"
                :key="l.code"
                :class="{ active: locale === l.code }"
                @click="setLocale(l.code)"
            >
                {{ l.code.toUpperCase() }}
            </button>
        </div>
        <div class="sidebar-icons">
            <div class="icons">
                <span>{{ t('sidebar.sections.sell') }}</span>
                <div
                    class="icons-box"
                    v-for="icon in sell"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.label">
                    </div>
                    <p>{{ icon.label }}</p>
                </div>
            </div>
            <div class="icons">
                <span>{{ t('sidebar.sections.serve') }}</span>
                <div
                    class="icons-box"
                    v-for="icon in serve"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.label">
                    </div>
                    <p>{{ icon.label }}</p>
                </div>
            </div>
            <div class="icons">
                <span>{{ t('sidebar.sections.bill') }}</span>
                <div
                    class="icons-box"
                    v-for="icon in bill"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.label">
                    </div>
                    <p>{{ icon.label }}</p>
                </div>
            </div>
            <div class="icons">
                <span>{{ t('sidebar.sections.run') }}</span>
                <div
                    class="icons-box"
                    v-for="icon in run"
                    :key="icon.id"
                    :class="{ active: activeItem === icon.name }"
                    @click="setActive(icon.name)"
                >
                    <div class="icon-wrap">
                        <img :src="icon.icon" :alt="icon.label">
                    </div>
                    <p>{{ icon.label }}</p>
                </div>
            </div>
            <div class="border"></div>
            <div class="icons-box" v-for="link in links" :key="link.id">
                <div class="icon-wrap">
                    <img :src="link.image" :alt="link.label">
                </div>
                <p>{{ link.label }}</p>
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
        align-items: center;
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
        text-transform: uppercase;
    }
    .lang-switch {
        display: flex;
        gap: 6px;
    }

    .lang-switch button {
        flex: 1;
        border: 1px solid #ebebf0;
        background-color: #fff;
        color: #4a4a55;
        border-radius: 8px;
        padding: 6px 0;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
    }

    .lang-switch button.active {
        background-color: var(--accent);
        border-color: var(--accent);
        color: #ffffff;
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
    .profile {
        width: 30px;
        height: 30px;
        margin-top: 5px;
        margin-left: 15px;
    }
    a {
        text-decoration: none;
    }

    .menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 8px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        position: fixed;
        top: 16px;
        left: 16px;
        z-index: 1100;
    }
    .menu-toggle span {
        width: 20px;
        height: 2px;
        background-color: #4a4a4a;
        margin: 0 auto;
    }

    .overlay {
        display: none;
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1000;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: flex;
        }
        .overlay {
            display: block;
        }
        aside {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 240px;
            transform: translateX(-100%);
            z-index: 1050;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
        }
        aside.open {
            transform: translateX(0);
        }
    }
</style>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
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
import Team from '../assets/user-search.png';
import Settings from '../assets/settings.png';
import Help from '../assets/help.png';
import Notifications from '../assets/notification.png'
import Your from '../assets/profile.png'
import Search from '../assets/search.png'

const { t, locale } = useI18n({ useScope: 'global' })
const isOpen = ref(false);
const activeItem = ref('contacts');
function setActive(name) {
    activeItem.value = name;
    isOpen.value = false;
}

function changeLanguage(code) {
    locale.value = code;
}

const sell = computed(() => [
    { id: 1, icon: Sun, name: 'today', label: t('sidebar.sell.today') },
    { id: 2, icon: Grid, name: 'grid', label: t('sidebar.sell.grid') },
    { id: 3, icon: Ai, name: 'leads', label: t('sidebar.sell.leads') },
    { id: 4, icon: Building, name: 'accounts', label: t('sidebar.sell.accounts') },
    { id: 5, icon: Profile, name: 'contacts', label: t('sidebar.sell.contacts') },
    { id: 6, icon: Goals, name: 'goals', label: t('sidebar.sell.goals') }
])
const serve = computed(() => [
    { id: 1, icon: Tick, name: 'tasks', label: t('sidebar.serve.tasks') },
    { id: 2, icon: Tickets, name: 'tickets', label: t('sidebar.serve.tickets') },
    { id: 3, icon: Base, name: 'knowledgeBase', label: t('sidebar.serve.knowledgeBase') },
    { id: 4, icon: Documents, name: 'documents', label: t('sidebar.serve.documents') },
])
const bill = computed(() => [
    { id: 1, icon: Invoices, name: 'invoices', label: t('sidebar.bill.invoices') },
    { id: 2, icon: Timesheet, name: 'timesheet', label: t('sidebar.bill.timesheet') },
])
const run = computed(() => [
    { id: 1, icon: Team, name: 'teamAccess', label: t('sidebar.run.teamAccess') },
    { id: 2, icon: Settings, name: 'settings', label: t('sidebar.run.settings') },
])
const links = computed(() => [
    { id: 1, image: Search, name: 'search', label: t('sidebar.links.search') },
    { id: 2, image: Notifications, name: 'notification', label: t('sidebar.links.notification') },
    { id: 3, image: Your, name: 'yourProfile', label: t('sidebar.links.yourProfile') },
    { id: 4, image: Help, name: 'help', label: t('sidebar.links.help') }
])
</script>