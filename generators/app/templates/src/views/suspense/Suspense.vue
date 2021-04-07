<template>
  <hr />
  <ul>
    <li>
      <a
        href="https://learnvue.co/2020/01/a-first-look-at-vue3-alpha-release-example-app-in-15-minutes/"
        target="_blank"
        >A First Look at Vue3 Alpha Release – Example App in 15 Minutes</a
      >
    </li>
    <li>
      <a
        href="https://vuejsdevelopers.com/2020/07/13/vue-async-components-suspense/#flexible-loading-state-with-suspense"
        target="_blank"
        >Vue 3 UX Wins with Async Components & Suspense</a
      >
    </li>
    <li>
      <a
        href="https://vuedose.tips/go-async-in-vue-3-with-suspense/"
        target="_blank"
        >Go async in Vue 3 with Suspense</a
      >
    </li>
  </ul>

  <p>name : {{ name }}</p>
  <Suspense>
    <template #default>
      <hr />
      <AsyncComponent :name="name" @update-name="updateName" />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
import { onMounted, ref } from 'vue';
import AsyncComponent from './AsyncComponent.vue';

export default {
  name: 'Suspense',
  components: {
    AsyncComponent,
  },
  setup() {
    const name = ref('du');
    onMounted(() => {
      console.log('onMounted');
    });
    const updateName = (val) => {
      console.log('updateName :', val);
      name.value = val;
    };

    return {
      name,
      updateName,
    };
  },
};
</script>
