interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  [key: string]: string
  readonly NG_APP_ENV: string
}
