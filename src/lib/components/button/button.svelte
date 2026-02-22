<script module lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  const variants = {
    success: 'active:bg-green-800 data-[active=true]:bg-green-800',
    danger: 'hover:text-red-400 active:text-red-500 data-[active=true]:text-red-500',
    border:
      'border border-neutral-500 hover:border-neutral-200 active:border-neutral-50 data-[active=true]:border-neutral-50',
    bg: 'hover:bg-black/30',
    'bg-inv': 'bg-black/30 hover:bg-black/10',
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
    'text-neutral-400 hover:text-neutral-200 active:text-neutral-50 data-[active=true]:text-neutral-50',
    'shadow-2xl disabled:pointer-events-none disabled:opacity-50',
    ...(Array.isArray(variant) ? variant : [variant]).map((variant) => variants[variant]),
    className,
  )}
>
  {@render children?.()}
</button>
