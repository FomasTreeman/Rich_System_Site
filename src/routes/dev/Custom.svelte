<script>
  import { onMount } from 'svelte';
  import SettingsForm from './SettingsForm.svelte';
  let currentSettings = {};

  function postSettings(newSettings) {
    fetch(`${import.meta.env.VITE_BOT_API_URL}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSettings),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onMount(async () => {
    const res = await fetch(`${import.meta.env.VITE_BOT_API_URL}/settings`);
    const { settings: newSettings } = await res.json();
    currentSettings = newSettings;
  });
</script>

<SettingsForm
  settings={currentSettings}
  on:submit={(e) => postSettings(e.detail)}
/>
