<script>
    import { fade, blur } from 'svelte/transition'; 
    import { linear } from 'svelte/easing';

    const bgcolor = (
        node,
        {
            delay = 0,
            duration = 400,
            easing = linear,
            color = "rgb(250 250 249)",
        }
    ) => {
        const style = getComputedStyle(node);
        const f = style.filter === 'none' ? '' : style.filter;

        return {
            delay,
            duration,
            easing,
            css: (t, u) => {
                return `background-color: ${color};`
            }
        }
    }


</script>
   
<div
    out:blur={{duration:200}}
    class="absolute inset-0 flex items-center justify-center flex-col text-center m-8
    z-[100]"
>
    <div
        in:bgcolor={{duration: 1000}}
        class="border-stone-50 border-2 p-5 bg-stone-950"
    >
        <img src="/icons/wordmark_white.svg" alt="logo/wordmark" class="px-10 py-5 rounded-sm select-none w-full"/>
    </div>
</div>