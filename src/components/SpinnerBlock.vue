<script setup lang="ts">

</script>
<template>
    <div class="spinner">
        <div class="rect1 bg-violet-700"></div>
        <div class="rect2 bg-violet-700"></div>
        <div class="rect3 bg-violet-700"></div>
        <div class="rect4 bg-violet-700"></div>
        <div class="rect5 bg-violet-700"></div>
    </div>
</template>

<style lang="scss" scoped>
.spinner {
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;


  &.rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  &.rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  &.rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
}
.spinner > div {
    height: 100%;
    width: 6px;
    display: inline-block;

    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>
