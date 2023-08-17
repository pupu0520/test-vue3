<template>
  <div id="aaa">
  </div>
</template>

<script setup>
import { Leafer, UI, PointerEvent } from 'leafer-ui';
import { onMounted } from 'vue';

const rect = UI.one({
  tag: 'Rect',
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  fill: 'red'
})

onMounted(() => {
  const leafer = new Leafer({view: 'aaa'});
  leafer.add(rect)
})

function onEnter(e) { 
  console.log(e)
  e.current.fill = 'blue'
}

function onLeave(e) {
  e.current.fill = 'pink'
}

rect.on('pointer.enter', onEnter)
rect.on('pointer.leave', onLeave);

// rect.on(PointerEvent.ENTER, onEnter)
// rect.on(PointerEvent.LEAVE, onLeave)
</script>
<style lang='scss' scoped>

</style>