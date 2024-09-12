<script>
  import "../app.css";
  import { onMount } from "svelte";
  import Startup from "$lib/components/Startup.svelte";
  import Welcome from "$lib/components/Welcome.svelte";
  import Modal from "$lib/components/Modal.svelte";

  const do_startup = false; // Boolean
  let stage = "startup"; // Start Sequence
	onMount(() => {
        /* Run boot sequence on first load, if stage == startup */
        if (do_startup) {
            setTimeout(() => {
                stage = "welcome";
                setTimeout(() => {
                    stage = "main";
                }, 2500)
            }, 4000)
        }
        else{
            stage = "main"
        }
	});

  /* Check if on mobile device by checking if userAgent contains android or iphone */
  let isMobile = () => {
      return /Android|iPhone/i.test(navigator.userAgent);
  };

  let showModal = true;;

</script>

<svelte:head>
    <!-- You can change icon sets according to your taste. Change `class` value in `contextItems` above to represent your icons. -->
    <!-- <link rel="stylesheet" href="/icon/css/mfglabs_iconset.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<!-- STARTUP SEQUENCE -->
{#if stage == 'startup'}
<div class="absolute h-screen w-screen bg-stone-950 text-stone-50">
  <Startup />
</div>

<!-- WELCOME MESSAGE -->
{:else if stage == 'welcome'}
<div class="absolute h-screen w-screen bg-stone-950 text-stone-50">
  <Welcome />
</div>


<!-- MAIN SEQUENCE -->
{:else if stage == 'main'}

{#if isMobile()}

  <Modal bind:showModal>
    <h1 slot="header">
      <b>Warning</b>
    </h1>
    <div class="w-full flex flex-col-reverse items-center justify-center gap-2">
      <p>
        Your device is not supported. Some features may not work as intended.
        Please use a desktop browser for the best experience.
      </p>
    </div>
  </Modal>
{/if}

<slot />
{/if}
