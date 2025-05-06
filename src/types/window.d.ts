
interface Window {
  netlifyIdentity: {
    on: (event: string, callback: (user?: any) => void) => void;
    init: (options?: any) => void;
  }
}
