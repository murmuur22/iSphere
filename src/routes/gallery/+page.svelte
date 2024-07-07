<script>
  import Modal from '$lib/components/Modal.svelte';
  import { gallery } from "$lib/stores.js"
	import { fade } from "svelte/transition";

  function saveImage(image){
    const downloadLink = document.createElement("a");
    downloadLink.href = image.url;
    downloadLink.download = image.title;
    downloadLink.click();
    downloadLink.remove();
  }

  let showModal = false;
  let modalData = {};
</script>

<div class="bg-gray-50 h-screen w-screen fixed z-[-1]"/>


<div class="fixed flex flex-row px-8 bg-zinc-100 w-full py-4 z-10 border-b-zinc-200 border-b">
  <a href="/" class="flex flex-row text-blue-500 gap-3">
    <img class="scale-75" src="/backbutton.png" alt="backbutton"/>
    Camera
  </a>
</div>
<div class="grid grid-flow-row sm:grid-cols-9 gap-1 px-8 pt-20 ">
{#each [...$gallery].reverse() as image, i}
  <button in:fade|global={{duration: 500, delay: 50*i }} on:click={()=>{showModal = true; modalData = image}} class="transition duration-150 hover:scale-110">
    <img src={image.url} alt="img-preview" class="aspect-square	shadow" />
  </button>
{/each}
</div>

<Modal bind:showModal>
  <h1 slot="header">
    {modalData.title}
  </h1>
  <div class="w-full flex flex-col-reverse items-center justify-center gap-2">
    <button on:click={()=>{saveImage(modalData)}} class="peer hover:text-blue-500">
      <i class="fa-solid fa-download"></i>
      Save
    </button>
    <img src={modalData.url} alt="img-preview" class="shadow peer-hover:brightness-50 transition duration-150" />
  </div>
</Modal>
