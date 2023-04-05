<header>
  <a href="/"> HOME </a>
  <a href="/activity"> ACTIVITY </a>
</header>

<slot />

<style>
  header {
    margin-block: 1.5rem;
    display: flex;
    justify-content: space-around;
    gap: 2rem;
  }

  a {
    font-weight: 500;
    color: greenyellow;
    text-decoration: inherit;
  }

  a:hover {
    color: green;
  }
</style>
