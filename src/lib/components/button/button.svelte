<script module lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  const variants = {
    success: 'text-green-400 active:text-green-800 data-[active=true]:text-green-800',
    danger: 'text-red-400 active:text-red-500 data-[active=true]:text-red-500',
  } as const;

  export type ButtonVariant = keyof typeof variants;

  export type ButtonProps = HTMLButtonAttributes & { variant?: ButtonVariant[] | ButtonVariant };
</script>

<script lang="ts">
  import { cn } from '$lib/utils';

  let {
    type = 'button',
    variant = [],
    class: className,
    children,
    ...rest
  }: ButtonProps = $props();
</script>

<button
  {type}
  {...rest}
  class={cn(
    'flex cursor-pointer items-center justify-center gap-1 rounded-full px-8 py-2 text-3xl',
    'font-bold text-neutral-50 active:text-neutral-50 data-[active=true]:text-neutral-50',
    'border border-neutral-500 active:border-neutral-50 data-[active=true]:border-neutral-50',
    'bg-black/30 shadow-2xl hover:bg-black/50 disabled:pointer-events-none disabled:opacity-50',
    ...(Array.isArray(variant) ? variant : [variant]).map((variant) => variants[variant]),
    className,
  )}
>
  {@render children?.()}
</button>
