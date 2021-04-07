<template>
  <h2>parent: 提供/注入</h2>
  <p>
    {{ location }} : ({{ geolocation.longitude }}, {{ geolocation.latitude }})
  </p>
  <button @click="updateLocation">updateLocation</button>
  <MyMarker />
</template>

<script>
import { provide, reactive, readonly, ref } from 'vue';
import MyMarker from './MyMarker';

export default {
  components: {
    MyMarker,
  },
  setup() {
    const location = ref('North Pole');
    const geolocation = reactive({
      longitude: 90,
      latitude: 135,
    });

    const updateLocation = () => {
      location.value = 'South Pole';
    };

    provide('location', readonly(location));
    provide('geolocation', readonly(geolocation));
    provide('updateLocation', updateLocation);

    return {
      location,
      geolocation,
      updateLocation,
    };
  },
};
</script>
