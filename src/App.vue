<script lang="ts" setup>
import DButton from './components/Button.vue'
import { ButtonType, ButtonSize } from './components/Button.feature'

const onClick = () => console.log(1)
</script>

<template>
  <div class="text-center">
    <h1 class="mt-[800px] mb-10">Button</h1>
    <div class="buttons">
      <d-button @click="onClick">Default</d-button>

      <d-button :type="ButtonType.Primary">Primary</d-button>
      <d-button :type="ButtonType.Default" :size="ButtonSize.Large"
        >Large</d-button
      >
      <d-button :type="ButtonType.Link" href="666" disabled>Link</d-button>
      <d-button :type="ButtonType.Text" disabled>Text</d-button>

      <d-button danger-level="warning" :size="ButtonSize.Small"
        >Warning</d-button
      >
      <d-button danger-level="warning" :type="ButtonType.Primary"
        >Warning</d-button
      >
      <d-button danger-level="2" :size="ButtonSize.Small">Danger</d-button>
      <d-button danger-level="2" :type="ButtonType.Primary">Danger</d-button>

      <d-button :type="ButtonType.Primary" disabled>disabled</d-button>
      <!-- <button type></button> -->
    </div>
  </div>
</template>
