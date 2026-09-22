<template>
    <aside>
        <div class="sidebar-top">
            <div class="intro">
                <div class="logo">
                    <span class="logo-black">Knew</span><span class="logo-purple">IT</span>
                </div>

            </div>
            <button class="menu-toggle" @click="menuOpen = !menuOpen">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <div class="profile-card">
            <div class="avatar">T</div>
            <div>
                <div class="profile-name">Talgat</div>
                <div class="profile-name">Baytukeshov</div>
                <div class="profile-role">{{ t('teacherSidebar.role') }}</div>
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

        <nav class="nav" :class="{ 'nav-open': menuOpen }">
            <div class="nav-group">
                <div
                    class="nav-item"
                    v-for="item in navGroups.main"
                    :key="item.id"
                    :class="{ active: activeItem === item.name }"
                    @click="setActive(item.name)"
                >
                    {{ item.label }}
                </div>
            </div>

            <div class="nav-group">
                <div
                    class="nav-item"
                    v-for="item in navGroups.work"
                    :key="item.id"
                    :class="{ active: activeItem === item.name }"
                    @click="setActive(item.name)"
                >
                    {{ item.label }}
                </div>
            </div>

            <div class="nav-group">
                <div
                    class="nav-item"
                    v-for="item in navGroups.admin"
                    :key="item.id"
                    :class="{ active: activeItem === item.name }"
                    @click="setActive(item.name)"
                >
                    {{ item.label }}
                </div>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, supportedLocales } from '../locales/i18n'

const { t, locale } = useI18n()
const activeItem = ref('main')
const menuOpen = ref(false)
function setActive(name) {
    activeItem.value = name
    menuOpen.value = false
}

const navGroups = computed(() => ({
    main: [
        { id: 1, name: 'main', label: t('teacherSidebar.nav.main') },
        { id: 2, name: 'schedule', label: t('teacherSidebar.nav.schedule') },
        { id: 3, name: 'courses', label: t('teacherSidebar.nav.courses') },
        { id: 4, name: 'allGroups', label: t('teacherSidebar.nav.allGroups') },
        { id: 5, name: 'students', label: t('teacherSidebar.nav.students') },
        { id: 6, name: 'blog', label: t('teacherSidebar.nav.blog') }
    ],
    work: [
        { id: 7, name: 'homework', label: t('teacherSidebar.nav.homework') },
        { id: 8, name: 'certificates', label: t('teacherSidebar.nav.certificates') },
        { id: 9, name: 'calendar', label: t('teacherSidebar.nav.calendar') }
    ],
    admin: [
        { id: 10, name: 'crm', label: t('teacherSidebar.nav.crm') },
        { id: 11, name: 'employees', label: t('teacherSidebar.nav.employees') },
        { id: 12, name: 'guide', label: t('teacherSidebar.nav.guide') }
    ]
}))
</script>

<style scoped>
aside {
    width: 260px;
    background-color: #ffffff;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-right: 1px solid #ebebf0;
    font-family: Arial, sans-serif;
}

.sidebar-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.logo {
    font-size: 20px;
    font-weight: 700;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
}

.menu-toggle span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #1a1a1a;
    border-radius: 2px;
}

.logo-black {
    color: #1a1a1a;
}

.logo-purple {
    color: var(--accent);
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

.nav {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.nav-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f4;
}

.nav-group:first-child {
    padding-top: 0;
    border-top: none;
}

.nav-item {
    padding: 12px 16px;
    border-radius: 10px;
    color: #4a4a55;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
}

.nav-item:hover {
    background-color: #f4f4f8;
}

.nav-item.active {
    background-color: var(--accent);
    color: #ffffff;
    font-weight: 600;
}

@media (max-width: 1024px) {
    aside {
        width: 220px;
        padding: 24px 14px;
    }
}

@media (max-width: 768px) {
    aside {
        width: 100%;
        height: auto;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 16px 20px;
        border-right: none;
        border-bottom: 1px solid #ebebf0;
    }

    .menu-toggle {
        display: flex;
    }

    .profile-card {
        padding: 8px 12px;
    }

    .profile-name {
        font-size: 13px;
    }

    .nav {
        display: none;
    }

    .nav.nav-open {
        display: flex;
    }
}
</style>