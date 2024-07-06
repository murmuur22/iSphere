<script>
  import * as THREE from 'three';
  import { OrbitControls } from '@threlte/extras';
  import { T, useTask } from '@threlte/core';

  export let video;
  export let fov;

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;

</script>

<T.Group >
  <T.PerspectiveCamera
    makeDefault
    position={[0, 0, 1]}
    {fov}
  > 
    <OrbitControls 
      enableDamping
      enableZoom={false}
      enablePan={false}
    />
  </T.PerspectiveCamera>
</T.Group>

<T.Mesh
>
  <T.SphereGeometry args={[100,100,100]}/>
  {#if texture}
    <T.MeshBasicMaterial map={texture} side={2} />
  {/if}
</T.Mesh>


