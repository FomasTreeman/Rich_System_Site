<script>
  // doesnt utilise cookies but does set them
  import user from '../../user';
  let currentError;

  const login = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_BOT_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            currentError = data.error;
          } else {
            user.set(data.username);
            document.cookie = `sessionToken=${data.sessionToken}`;
            console.log('logged in: ', data.username, data.sessionToken);
          }
        });
    } catch (error) {
      currentError = error;
    }
  };

  $: console.log(currentError);
</script>

<form on:submit|preventDefault={login} class="flex col">
  <input type="text" name="username" placeholder="username" id="username" />
  <input
    type="password"
    name="password"
    placeholder="password"
    id="password"
    required
  />
  <button type="submit">Login</button>
</form>

<style>
  form {
    background-color: black;
    border-radius: 2rem;
    padding: 1.5rem;
  }

  input {
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .col {
    gap: 1rem;
  }
</style>
