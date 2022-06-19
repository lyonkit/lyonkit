<template>
  <div class="layout flex min-h-screen">
    <LayoutNavbar class="navbar" />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  --navbar-size: 15rem;
}

.navbar {
  width: var(--navbar-size);
}

.main {
  width: calc(100vw - var(--navbar-size));
}
</style>
