declare global {
  var process: NodeJS.Process
  namespace NodeJS {
    interface ProcessEnv {
      readonly COOKIE_TOKEN_NAME: string
      readonly BASE_URL: string
    }
  }
}

export {}
