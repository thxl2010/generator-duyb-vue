<template>
  <div>
    <h2>child: 提供/注入</h2>
    <p>
      {{ userLocation }} : ({{ userGeolocation.longitude }},
      {{ userGeolocation.latitude }})
    </p>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const userLocation = inject('location', 'The Universe');
    const userGeolocation = inject('geolocation');
    const updateUserLocation = inject('updateUserLocation');

    return {
      userLocation,
      userGeolocation,
      updateUserLocation,
    };
  },
};
</script>
