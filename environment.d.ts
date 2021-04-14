declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string
      PORT: string
      MONGO_DB_NAME: string
      CORS_ORIGINS: string
    }
  }
}

export { }
