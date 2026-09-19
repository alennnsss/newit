<template>
    <div class="container">
        <TheSidebar />
        <TheAdmin />
    </div>
    
</template>

<script setup>
import TheSidebar from '../components/TheSidebar.vue';
import TheAdmin from '../components/TheAdmin.vue';
</script>

<style scoped>
    .container {
        background-color: #d1d5e27b;
        display: flex;

    }
</style>