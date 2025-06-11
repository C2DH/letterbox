export type AsyncStatus =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; message?: string }
  | { type: 'error'; message?: string };
