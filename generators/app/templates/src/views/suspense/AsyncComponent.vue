<template>
  <div>
    This is our asynchronous component!!
    <input type="text" v-model="val" @keydown.enter="updateName" />
  </div>
</template>

<script>
import { ref, toRefs } from 'vue';

async function wait(ms, emit) {
  return new Promise((resolve) => {
    setTimeout(() => {
      emit('update-name', 'Du');
      resolve();
    }, ms);
  });
}
export default {
  props: {
    name: {
      type: String,
      default: 'hello',
    },
  },
  // ! setup 函数中的第一个参数是 props。正如在一个标准组件中所期望的那样，setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新。
  // ! 但是，因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性。
  // ! 如果需要解构 prop，可以通过使用 setup 函数中的 toRefs 来安全地完成此操作。

  // ! 传递给 setup 函数的第二个参数是 context。context 是一个普通的 JavaScript 对象，它暴露三个组件的 property：
  // context.attrs :  Attribute (非响应式对象)
  // context.slots : 插槽 (非响应式对象)
  // context.emit  : 触发事件 (方法)
  // ! context 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。
  // ! attrs 和 slots 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 attrs.x 或 slots.x 的方式引用 property。
  // ! 请注意，与 props 不同，attrs 和 slots 是非响应式的。如果你打算根据 attrs 或 slots 更改应用副作用，那么应该在 onUpdated 生命周期钩子中执行此操作。
  async setup(props, { emit }) {
    const val = ref('');
    console.log('props :', props, props.name, ' emit :', emit);
    const { name } = toRefs(props);
    console.log('使用 toRefs 解构 prop : ', name, name.value);

    await wait(5000, emit);

    const updateName = (event) => {
      console.log('event :', event);
      emit('update-name', event.target.value);
    };

    return {
      val,
      updateName,
    };
  },
};
</script>
