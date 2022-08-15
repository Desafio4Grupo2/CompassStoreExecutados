import App from './app'

const app = new App()

app.init().listen(process.env.API_EXPOSED_PORT || process.env.PORT || 3000, () => {
  console.info(`App starting at http://localhost:${process.env.API_EXPOSED_PORT || process.env.PORT || 3000}`)
  console.info(`Envs: ${process.env.TARGET || 'local'}`)
})
