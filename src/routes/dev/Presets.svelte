<script>
  import { onMount } from 'svelte';
  import SettingsForm from './SettingsForm.svelte';

  let presets = {};
  let settings = {};
  let showForm = false;
  let newPresetName = '';

  function post(params, body = null) {
    fetch(`${import.meta.env.VITE_BOT_API_URL}/settings/${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadPreset(preset) {
    post(`${preset}.load`);
  }

  function createPreset(preset, newPresetSettings) {
    const presetSettings = {};
    for (const [key, value] of Object.entries(newPresetSettings)) {
      presetSettings[key] = value;
    }
    // post(`${preset}.create`, JSON.stringify(presetSettings));
  }

  function showPresetForm(name) {
    showForm = true;
    newPresetName = name;
  }

  function submit(action, preset, newPresetSettings = null) {
    if (action == 'load') loadPreset(preset);
    if (action == 'create') createPreset(preset, newPresetSettings);
  }

  $: console.log(presets);

  onMount(async () => {
    const res = await fetch(`${import.meta.env.VITE_BOT_API_URL}/settings`);
    const { settings: newSettings, presets: newPresets } = await res.json();
    console.log(newPresets, newSettings);
    presets = newPresets;
    settings = newSettings;
  });
</script>

<section class="flex col">
  {#each Object.entries(presets) as [preset, presetSettings]}
    <li>
      <h2>{preset}</h2>
      <div class="flex">
        <button> show settings </button>
        <button on:submit={() => submit('load', 'preset1')}>
          load preset
        </button>
      </div>
    </li>
  {/each}
</section>

<form on:submit|preventDefault={(e) => showPresetForm(e.target.name.value)}>
  <input type="text" name="name" placeholder="preset name" />
  <button type="submit">CREATE PRESET</button>
</form>
{#if showForm}
  <SettingsForm
    {settings}
    on:submit={(e) => submit('create', newPresetName, e.detail)}
  />
{/if}

<style>
  .flex {
    justify-content: space-around;
  }

  li {
    background-color: blueviolet;
    margin: 2rem;
  }

  h2 {
    margin: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
