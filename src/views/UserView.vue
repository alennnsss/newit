<template>
    <div class="page">
        <TheUserSidebar />
        <TheUserMain />
    </div>
</template>
 
<script setup>

import TheUserSidebar from '../components/TheUserSidebar.vue';
import TheUserMain from '../components/TheUserMain.vue';

</script>
 
<style scoped>

.page {
    display: flex;
    min-height: 100vh;
}

@media (max-width: 768px) {
    .page {
        flex-direction: column;
    }
}
</style>
 