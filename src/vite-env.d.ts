/// <reference types="vite/client" />

// vite/client only declares lowercase asset extensions; some screenshots in
// src/assets/projects use uppercase .PNG
declare module "*.PNG" {
  const src: string
  export default src
}

declare module "*.JPG" {
  const src: string
  export default src
}
