<template>
  <div :id="side + 'Panel'">
    <h3>{{title}}</h3>
    <p>That`s a {{ side }} panel!</p>
    <div class="panel-content-wrapper">
      <slot />
    </div>

  </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    side: {
        type: String,
        required: true,
        validator: (value) => ['left', 'right'].includes(value)
    }
});
</script>

<style scoped>
#leftPanel, #rightPanel {
    padding: 15px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 20px;
}

</style>