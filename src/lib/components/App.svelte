<script>
  import * as THREE from 'three';
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte'
  import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { scale } from 'svelte/transition';
  import { gallery } from '$lib/stores.js';

  let videoRef;
  let loading = false;

  let stream;
  async function startStream() {
    try {
      loading = true;
      stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
          width: 1280,
          height: 720,
          facingMode: 'user',
      });
      videoRef.srcObject = stream;
      videoRef.play();
      loading = false;
      } catch (err) {
          console.log(err);
      }
  };
  function endStream(){
      stream.getTracks().forEach((track) => {
          if (track.readyState == 'live') {
              track.stop();
          }
      });
  }

  let canvas;
  function takeImage(){

    // Convert canvas to dataURL
    let imageUrl = canvas.toDataURL("image/jpeg", 1.0);

    gallery.set([...$gallery, {
      title:`selfie_${$gallery.length+1}`,
      url: imageUrl,
      timestamp: Math.floor(Date.now() / 1000),
    }])

  }


  /* Check if on mobile device by checking if userAgent contains android or iphone */
  let isMobile = () => {
      return /Android|iPhone/i.test(navigator.userAgent);
  };
  let fov = spring(100);
  /* if on mobile set fov to 120 */
  if (isMobile()){
    fov = spring(120);
  }

  function onWheel(e){
    let newFov = $fov + e.deltaY * 0.1

    if (newFov < 170 && newFov > 50) {
      fov.set(newFov);
    }
  }

  /* Start stream on mount end on unmount */
  onMount(() => {
    startStream();
    canvas = document.querySelector("canvas");

    return () => {
      endStream();
    }
  });

</script>

<video muted style="display:none" autoplay bind:this={videoRef} />

<div class="h-screen w-screen" on:wheel={onWheel}>
  <Canvas renderMode={'always'} rendererParameters={{preserveDrawingBuffer: true}}>
    <Scene video={videoRef} fov={$fov} />
  </Canvas>

  <div class="fixed bottom-0 w-full text-white h-20 grid grid-flow-col grid-cols-3 items-center px-8 bg-gradient-to-t from-neutral-950 to-neutral-600">

    <div class="flex gap-2">
      {#key $gallery}
        <a
          in:scale={{duration: 100}}
          href="/gallery"
          class="
          bg-black rounded-sm h-12 w-12 
            drop-shadow overflow-hidden 
            flex items-center
          "
        >
          {#if $gallery.length > 0}
            <img src={$gallery[$gallery.length-1].url} alt="img-preview" class="sm:w-full md:h-full" />
          {/if}
        </a>
      {/key}
    </div>

    <button 
      class="
        group p-3 rounded-full justify-self-center
        bg-gradient-to-t from-neutral-500 to-neutral-300 
        ring-2 ring-neutral-400 ring-offset-2 ring-offset-neutral-800
        hover:from-neutral-600 hover:to-neutral-400 hover:ring-offset-neutral-900
      "
      on:click={()=>{takeImage(canvas)}}
    >
      <svg class="fill-neutral-800 group-hover:fill-neutral-900 w-7" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path class="cls-1" d="M50,68.98h0c-9.38,0-16.98-7.6-16.98-16.98h0c0-1.55.21-4.37,1.72-7.45.33-.67,1.36-2.67,3.26-4.56,4.4-4.37,10.2-4.88,12.01-4.97h0c9.38,0,16.98,7.6,16.98,16.98h0c0,9.38-7.6,16.98-16.98,16.98Z"/>
        <path class="cls-1" d="M87.43,17.78h-10.92c-2.24,0-4.31-1.09-5.69-2.86-2.49-3.19-6.37-5.23-10.73-5.23h-20.83c-4.36,0-8.24,2.05-10.73,5.23-1.38,1.77-3.45,2.86-5.69,2.86h-10.92c-5.85,0-10.59,4.74-10.59,10.59v47c0,5.85,4.74,10.59,10.59,10.59h75.51c5.85,0,10.59-4.74,10.59-10.59V28.37c0-5.85-4.74-10.59-10.59-10.59ZM50,74.97h0c-12.69,0-22.97-10.28-22.97-22.97s10.28-22.97,22.97-22.97h0c12.69,0,22.97,10.28,22.97,22.97s-10.28,22.97-22.97,22.97Z"/>
      </svg>
    </button>

  </div>

</div>