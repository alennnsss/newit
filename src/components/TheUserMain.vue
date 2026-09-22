<template>
    <main>
        <div class="top-row">
            <div>
                <h1>{{ t('dashboard.greeting', { name: user.name }) }}</h1>
                <p class="date">{{ today }}</p>
            </div>
            <div class="bell">
                <img src="../assets/notification.png" :alt="t('sidebar.links.notification')">
            </div>
        </div>

        <div class="hero-row">
            <div class="lesson-card">
                <span class="lesson-label">{{ t('dashboard.nextLesson.label') }}</span>
                <div class="lesson-time">
                    {{ nextLesson.day }} {{ nextLesson.start }}
                    <span class="lesson-end">{{ t('dashboard.nextLesson.until', { time: nextLesson.end }) }}</span>
                </div>
                <div class="lesson-group">{{ t('dashboard.nextLesson.group') }}</div>
                <div class="lesson-topic">{{ nextLesson.topic }}</div>

                <div class="lesson-meta">
                    <span class="badge-offline">
                        <img src="../assets/location.png" alt="">
                        {{ t('dashboard.nextLesson.offline') }}
                    </span>
                    <span class="lesson-room">{{ t('dashboard.nextLesson.room', { room: nextLesson.room }) }}</span>
                </div>

                <div class="lesson-schedule">
                    {{ nextLesson.weekday }} · {{ nextLesson.start }}–{{ nextLesson.end }}
                </div>

                <button class="btn-open">
                    {{ t('dashboard.nextLesson.openSchedule') }}
                    <span>→</span>
                </button>
            </div>

            <div class="today-card">
                <h2>{{ t('dashboard.today.title') }}</h2>

                <div class="today-item">
                    <div class="today-icon icon-blue"><img src="../assets/grid.png" alt="grid"></div>
                    <div class="today-text">
                        <span class="today-label">{{ t('dashboard.today.lessons') }}</span>
                        <span class="today-value">{{ t('dashboard.today.noLessons') }}</span>
                        <span class="today-sub">{{ t('dashboard.today.scheduleEmpty') }}</span>
                    </div>
                </div>

                <div class="today-item">
                    <div class="today-icon icon-orange"><img src="../assets/clipboard-tick.png" alt=""></div>
                    <div class="today-text">
                        <span class="today-label">{{ t('dashboard.today.homework') }}</span>
                        <span class="today-value is-empty">{{ t('dashboard.today.queueEmpty') }}</span>
                        <span class="today-sub">{{ t('dashboard.today.noNewSubmissions') }}</span>
                    </div>
                    <span class="today-arrow">→</span>
                </div>

                <div class="today-item">
                    <div class="today-icon icon-green"><img src="../assets/profile-2user.png" alt=""></div>
                    <div class="today-text">
                        <span class="today-label">{{ t('dashboard.today.groups') }}</span>
                        <span class="today-value">{{ t('dashboard.today.groupsCount', groupsCount) }}</span>
                    </div>
                    <span class="today-arrow">→</span>
                </div>

                <div class="today-item">
                    <div class="today-icon icon-purple"><img src="../assets/enhance-prize.png" alt=""></div>
                    <div class="today-text">
                        <span class="today-label">{{ t('dashboard.today.students') }}</span>
                        <span class="today-value">{{ t('dashboard.today.studentsCount', studentsCount) }}</span>
                    </div>
                    <span class="today-arrow">→</span>
                </div>
            </div>
        </div>

        <div class="quick-row">
            <div class="quick-card" v-for="item in quickLinks" :key="item.id">
                <div class="quick-icon"><img :src="item.icon" alt=""></div>
                <div>
                    <div class="quick-title">{{ item.title }}</div>
                    <div class="quick-sub">{{ item.sub }}</div>
                </div>
            </div>
        </div>

        <div class="groups-header">
            <h2>{{ t('dashboard.myGroups') }}</h2>
            <a href="#" class="all-groups">{{ t('dashboard.allGroups') }}</a>
        </div>

        <div class="group-card" v-for="group in groups" :key="group.id">
            <div class="group-top">
                <div class="group-title-row">
                    <span class="group-title">{{ group.name }}</span>
                    <span class="badge-next">{{ t('dashboard.group.nextLesson') }}</span>
                </div>
                <span class="badge-offline light">{{ group.mode }}</span>
            </div>
            <p class="group-desc">{{ group.description }}</p>
            <div class="group-info-row">
                <div class="group-info-box">
                    <span class="group-info-label">{{ t('dashboard.group.schedule') }}</span>
                    <span class="group-info-value">{{ group.schedule }}</span>
                </div>
                <div class="group-info-box">
                    <span class="group-info-label">{{ t('dashboard.group.branch') }}</span>
                    <span class="group-info-value">{{ group.branch }}</span>
                </div>
                <div class="group-info-box">
                    <span class="group-info-label">{{ t('dashboard.group.students') }}</span>
                    <span class="group-info-value">{{ group.studentsCount }}</span>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const user = { name: 'Talgat' }
const today = 'Вторник, 15 сентября'

const nextLesson = {
    day: 'Ср',
    start: '18:00',
    end: '19:30',
    topic: 'Словари и кортежи · Python + SQL + Django REST Framework',
    room: 4,
    weekday: 'Среда'
}

const groupsCount = { count: 1 }
const studentsCount = { count: 2 }

import Grid from '../assets/grid.png'
import Tick from '../assets/clipboard-tick.png'
import Base from '../assets/book-open.png'
import Profile from '../assets/profile-2user.png'

const quickLinks = computed(() => [
    { id: 1, icon: Grid, title: t('dashboard.quickLinks.schedule.title'), sub: t('dashboard.quickLinks.schedule.sub') },
    { id: 2, icon: Tick, title: t('dashboard.quickLinks.homework.title'), sub: t('dashboard.quickLinks.homework.sub') },
    { id: 3, icon: Profile, title: t('dashboard.quickLinks.students.title'), sub: t('dashboard.quickLinks.students.sub') },
    { id: 4, icon: Base, title: t('dashboard.quickLinks.courses.title'), sub: t('dashboard.quickLinks.courses.sub') }
])

const groups = [
    {
        id: 1,
        name: t('dashboard.nextLesson.group'),
        mode: t('dashboard.nextLesson.offline'),
        description: 'Python + SQL + Django REST Framework · BACK-END · PYTHON / DJANGO',
        schedule: 'Ср, 18:00',
        branch: 'Кабинет 4',
        studentsCount: '2'
    }
]
</script>

<style scoped>
* {
    box-sizing: border-box;
}

main {
    flex: 1;
    padding: 40px 50px;
    background-color: #f4f4f8;
    font-family: Arial, sans-serif;
    min-height: 100vh;
}

.top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
}

h1 {
    font-size: 32px;
    color: #1a1a1a;
    margin: 0;
}

.date {
    color: var(--text-secondary);
    margin-top: 8px;
    font-size: 14px;
}

.bell {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.bell img {
    width: 20px;
    height: 20px;
}

.hero-row {
    display: flex;
    gap: 24px;
    margin-bottom: 30px;
}

.lesson-card {
    flex: 2;
    background: linear-gradient(135deg, #16163a 0%, #0d0d24 100%);
    border-radius: 20px;
    padding: 32px;
    color: #ffffff;
    position: relative;
    overflow: hidden;
}

.lesson-card::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(108, 92, 231, 0.35), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
}

.lesson-card > * {
    position: relative;
}

.lesson-label {
    font-size: 12px;
    letter-spacing: 1px;
    color: #a9a9c0;
    text-transform: uppercase;
}

.lesson-time {
    font-size: 48px;
    font-weight: 800;
    margin: 12px 0;
}

.lesson-end {
    font-size: 16px;
    font-weight: 400;
    color: #a9a9c0;
    margin-left: 8px;
}

.lesson-group {
    font-size: 18px;
    font-weight: 700;
    margin-top: 16px;
}

.lesson-topic {
    color: #c2c2d6;
    margin-top: 6px;
    font-size: 14px;
}

.lesson-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
}

.badge-offline {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: #23233f;
    color: #ffffff;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
}

.badge-offline img {
    width: 14px;
    height: 14px;
}

.badge-offline.light {
    background-color: #f0f0f4;
    color: #4a4a55;
}

.lesson-room {
    color: #c2c2d6;
    font-size: 14px;
}

.lesson-schedule {
    color: #c2c2d6;
    margin-top: 12px;
    font-size: 14px;
}

.btn-open {
    margin-top: 24px;
    width: 100%;
    background-color: #ffffff;
    color: #1a1a1a;
    border: none;
    border-radius: 12px;
    padding: 16px;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-open:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.today-card {
    flex: 1;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 24px;
}

.today-card h2 {
    font-size: 20px;
    margin: 0 0 16px 0;
    color: #1a1a1a;
}

.today-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #f7f7fa;
    border-radius: 14px;
    padding: 14px;
    margin-bottom: 12px;
}

.today-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background-color: #eeeeff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.today-icon.icon-blue {
    background-color: #eef4ff;
}

.today-icon.icon-orange {
    background-color: #fff4e5;
}

.today-icon.icon-green {
    background-color: #eafaf0;
}

.today-icon.icon-purple {
    background-color: var(--accent-bg);
}

.today-icon img {
    width: 18px;
    height: 18px;
}

.today-text {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.today-text span {
    color: #0d0d24;
}
.today-label {
    font-size: 12px;
}

.today-value {
    font-size: 15px;
    font-weight: 700;
    margin-top: 2px;
}

.today-sub {
    font-size: 12px;
    margin-top: 2px;
}

.today-arrow {
    color: var(--text-muted);
    cursor: pointer;
}

.quick-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.quick-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
}

.quick-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background-color: #eeeeff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.quick-icon img {
    width: 20px;
    height: 20px;
}

.quick-title {
    font-weight: 700;
    color: #1a1a1a;
    font-size: 15px;
}

.quick-sub {
    font-size: 13px;
    color: var(--active-color);
    margin-top: 2px;
}

.groups-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.groups-header h2 {
    font-size: 22px;
    color: #1a1a1a;
    margin: 0;
}

.all-groups {
    color: var(--accent);
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
}

.group-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #ebebf0;
}

.group-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.group-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.group-title {
    font-weight: 700;
    font-size: 17px;
    color: #1a1a1a;
}

.badge-next {
    background-color: var(--accent-bg);
    color: var(--accent);
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
}

.group-desc {
    color: var(--text-secondary);
    font-size: 13px;
    margin: 10px 0 16px 0;
}

.group-info-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.group-info-box {
    background-color: #f7f7fa;
    border-radius: 12px;
    padding: 14px;
}

.group-info-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.group-info-value {
    display: block;
    margin-top: 4px;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
}

@media (max-width: 1100px) {
    .hero-row {
        flex-direction: column;
    }

    .quick-row {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    main {
        padding: 24px 20px;
    }

    h1 {
        font-size: 24px;
    }

    .lesson-card {
        padding: 24px;
    }

    .lesson-time {
        font-size: 34px;
    }

    .lesson-meta {
        flex-wrap: wrap;
        gap: 10px;
    }

    .today-card {
        padding: 20px;
    }

    .quick-row {
        grid-template-columns: 1fr;
        margin-bottom: 24px;
    }

    .groups-header h2 {
        font-size: 18px;
    }

    .group-info-row {
        grid-template-columns: 1fr;
        gap: 8px;
    }

    .group-card {
        padding: 18px;
    }
}

@media (max-width: 480px) {
    main {
        padding: 16px;
    }

    .top-row {
        align-items: center;
    }

    h1 {
        font-size: 20px;
    }

    .date {
        font-size: 13px;
    }

    .bell {
        width: 38px;
        height: 38px;
    }

    .lesson-time {
        font-size: 28px;
    }

    .lesson-label {
        font-size: 11px;
    }

    .btn-open {
        font-size: 14px;
        padding: 14px;
    }

    .today-item {
        padding: 12px;
    }

    .today-icon {
        width: 32px;
        height: 32px;
    }

    .today-icon img {
        width: 16px;
        height: 16px;
    }
}
</style>