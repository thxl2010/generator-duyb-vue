<template>
  <div>
    <p>count: {{ count }}</p>
    <p>twiceTheCount : {{ twiceTheCount }}</p>
    <button @click="count++">Increment count</button>
    <button @click="increase">{{ btnText }} increase</button>
    <button @click="reverse">{{ btnText }} reverse</button>
    <button @click="getList">{{ btnText }} getList</button>
    <div>
      <ul>
        <li v-for="item in list" :key="item.id">
          <span>{{ item.name }}</span>
          <button @click="update(item)">update</button>
        </li>
      </ul>
    </div>

    <div>
      <p>
        <a
          href="https://v3.vuejs.org/guide/reactivity-fundamentals.html#declaring-reactive-state"
          target="_blank"
          >To create a reactive state from a JavaScript object</a
        >
      </p>
      <p>state.count : {{ state.count }}</p>
      <button @click="increaseStateCount">increase state.count</button>
    </div>

    <div>
      <p>
        watchEffect ： <span>{{ state.text }}</span
        ><span ref="out" id="out">watchEffect</span>
      </p>
    </div>

    <div>
      useMouse pointer : pointer.x.value : {{ pointer.x.value }} ,
      pointer.y.value: {{ pointer.y.value }}
    </div>
    <div>useMouse x : {{ x }} , y: {{ y }}</div>
    <div>
      useMouse reactive pointer2 : pointer2.x : {{ pointer2.x }} , pointer2.y:
      {{ pointer2.y }}
    </div>

    <div>
      <h2>提供/注入</h2>
      <MyMap />
    </div>
  </div>
</template>

<script>
import {
  computed,
  watchEffect,
  reactive,
  ref,
  onMounted,
  watch,
  readonly,
} from 'vue';
import API from 'API';
import useMouse from '@/composables/useMouse';
import MyMap from '@/components/MyMap';

const LIST = [
  {
    id: '1',
    name: 'DU',
  },
  {
    id: '2',
    name: 'Li',
  },
  {
    id: '3',
    name: 'Chen',
  },
];

export default {
  setup() {
    const btnText = '点击按钮';
    const count = ref(0);
    // ! [Reacting to Changes with watch](https://v3.vuejs.org/guide/composition-api-introduction.html#reacting-to-changes-with-watch)
    watch(count, (newVal, oldVal) => {
      console.log('newVal, oldVal :', newVal, oldVal);
      console.log('The new count value is: ' + count.value);
    });
    const twiceTheCount = computed(() => count.value * 2);

    const increase = () => {
      count.value++;
      console.log('count :', count, ' twiceTheCount :', twiceTheCount);
    };

    // To create a reactive state from a JavaScript object
    // https://v3.vuejs.org/guide/reactivity-fundamentals.html#declaring-reactive-state
    const state = reactive({
      count: 0,
      text: 'watchEffect',
    });
    const copy = readonly(state);
    const increaseStateCount = () => {
      state.count++;
      // mutating the copy will fail and result in a warning
      // ! warning: "Set operation on key 'count' failed: target is readonly."
      copy.count++;
    };

    const out = ref(null);
    console.log('ref out :', out, out.value, document.querySelector('#out'));
    onMounted(() => {
      // 副作用：立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数
      // ! 注意setup()将在组件挂载前调用，因此如果想要在watchEffect中使用 DOM （或者组件），请在挂载的钩子中声明watchEffect
      // watch 相比 watchEffect , watch 是惰性的，更明确哪些状态的改变会触发侦听器重新运行，并且可以访问被侦听属性的变化前后的值。
      watchEffect(
        (onInvalidate) => {
          // WARNING: 在渲染完成后, 这个 DOM 会被赋值给 out ref 对象
          console.log(
            'onMounted ref out :',
            out,
            out.value,
            document.querySelector('#out')
          );

          // document.querySelector('#out').innerHTML = `副作用 watchEffect ${
          out.value.innerHTML = `副作用 watchEffect ${
            state.text
          } ${new Date()}`;
          console.log('watchEffect state.text :', state.text);

          // ! 清除副作用
          onInvalidate(() => {
            console.log('清除副作用');
          });
        },
        {
          flush: 'sync',
        }
      );
    });

    // 修改响应式数据，这会触发副作用函数重新执行
    setTimeout(() => {
      state.text += ' world';
    }, 5000);

    let list = ref(LIST);
    const getList = async () => {
      list.value = await API.fetchUserRepositories();
      console.log('async/await list :', list);
    };
    function reverse() {
      list.value = list.value.reverse();
      console.log('list :', list);
      console.log('list[0] :', list.value[0]);
    }
    const update = (item) => {
      item.name = `${item.name} ${item.content}`;
    };

    // ! [Lifecycle Hook Registration Inside setup](https://v3.vuejs.org/guide/composition-api-introduction.html#lifecycle-hook-registration-inside-setup)
    onMounted(getList);
    onMounted(() => {
      console.log(
        '---- onMounted: Lifecycle Hook Registration Inside setup ----'
      );
      increase();
    });

    // useMouse
    const { x, y } = useMouse();
    const pointer = { x, y };
    const pointer2 = reactive({ x, y });

    return {
      btnText,
      count,
      twiceTheCount,
      increase,
      list,
      getList,
      reverse,
      update,
      state,
      out,
      increaseStateCount,
      pointer,
      x,
      y,
      pointer2,
    };
  },
  mounted() {
    console.log('---- mounted ----');
  },
  components: {
    MyMap,
  },
};
</script>

<style></style>
