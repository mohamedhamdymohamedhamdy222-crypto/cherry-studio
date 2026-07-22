const http = require('http')

const port = Number(process.env.PORT || 3000)

const server = http.createServer((request, response) => {
  if (request.url !== '/' && request.url !== '/health') {
    response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' })
    response.end(JSON.stringify({ status: 'not_found' }))
    return
  }

  response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
  response.end(
    JSON.stringify({
      status: 'ok',
      service: process.env.RAILWAY_SERVICE_NAME || 'cherry-studio-package',
      commit: process.env.RAILWAY_GIT_COMMIT_SHA || null,
      note: 'Desktop package build completed successfully'
    })
  )
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Railway health service listening on port ${port}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
  })
}
