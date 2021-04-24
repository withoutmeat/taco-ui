<script lang="ts" setup>
import Button, { ButtonType, ButtonSize } from './components/Button.vue'

const onClick = () => console.log(1)
</script>
<template>
  <div class="text-center">
    <h1 class="mt-[800px] mb-10">Button</h1>
    <div class="buttons">
      <Button @click="onClick">Default</Button>

      <Button :btnType="ButtonType.Primary">Primary</Button>
      <Button :btnType="ButtonType.Default" :size="ButtonSize.Large">Large</Button>
      <Button :btnType="ButtonType.Link" disabled>Link</Button>
      <Button :btnType="ButtonType.Text" disabled>Text</Button>

      <Button dangerLevel="warning" :size="ButtonSize.Small">Warning</Button>
      <Button dangerLevel="warning" :btnType="ButtonType.Primary">Warning</Button>
      <Button dangerLevel="2" :size="ButtonSize.Small">Danger</Button>
      <Button dangerLevel="2" :btnType="ButtonType.Primary">Danger</Button>

      <Button :btnType="ButtonType.Primary" disabled>disabled</Button>
    </div>
  </div>
</template>
