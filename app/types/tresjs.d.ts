declare module '@tresjs/core' {
  export function useLoop(): {
    onBeforeRender: (callback: (state: { elapsed: number; delta: number }) => void) => void
  }
}
