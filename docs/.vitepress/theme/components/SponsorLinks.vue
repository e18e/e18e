<script setup lang="ts">
import { data as sponsors } from '../sponsors.data'
</script>

<template>
  <div class="sponsor-links">
    <div v-for="tier in sponsors" :key="tier.tier" class="sponsor-tier">
      <h4 class="sponsor-tier-title">
        {{ tier.tier }}
      </h4>
      <div class="sponsor-grid" :class="`sponsor-grid-${tier.size}`">
        <a
          v-for="item in tier.items"
          :key="item.url"
          :href="item.url"
          target="_blank"
          rel="noopener"
          :title="item.name"
          class="sponsor-link"
        >
          <img
            :src="item.img"
            :alt="item.name"
            class="sponsor-avatar"
            loading="lazy"
          >
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sponsor-links {
  max-width: 768px;
  margin: 1.5rem auto 0;
}

.sponsor-tier {
  margin-bottom: 2rem;
}

.sponsor-tier-title {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.5;
  margin-bottom: 1rem;
}

.sponsor-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.sponsor-link {
  display: block;
  transition: opacity 0.2s;
  opacity: 0.8;
}

.sponsor-link:hover {
  opacity: 1;
}

.sponsor-avatar {
  border-radius: 50%;
}

.sponsor-grid-big {
  gap: 1rem;
}

.sponsor-grid-big .sponsor-avatar {
  width: 80px;
  height: 80px;
}

.sponsor-grid-medium {
  gap: 0.75rem;
}

.sponsor-grid-medium .sponsor-avatar {
  width: 64px;
  height: 64px;
}

.sponsor-grid-small {
  gap: 0.625rem;
}

.sponsor-grid-small .sponsor-avatar {
  width: 48px;
  height: 48px;
}

.sponsor-grid-mini {
  gap: 0.5rem;
}

.sponsor-grid-mini .sponsor-avatar {
  width: 40px;
  height: 40px;
}
</style>
