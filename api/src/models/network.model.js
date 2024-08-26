import os from 'os'

const LOCALHOST = '127.0.0.1'

export default class NetworkModel {
  constructor (port) {
    this.port = port
    this.isExpose = process.argv.find((arg) => arg === '--host')
    this.host = this.isExpose
      ? '0.0.0.0'
      : '127.0.0.1'
    this.ipv4 = this.networksIPv4()
  }

  // methods
  networksIPv4 () {
    const ipv4 = []
    const interfaces = os.networkInterfaces()

    for (const net in interfaces) {
      ipv4.push(interfaces[net].find((element) => {
        return element.family === 'IPv4'
      }))
    }
    return ipv4
  }

  printNetworks () {
    console.log(`➜ Local:   http://localhost:${this.port}/`)

    if (this.isExpose) {
      for (const net of this.ipv4) {
        if (net.address !== LOCALHOST) { console.log(`➜ Network: http://${net.address}:${this.port}/`) }
      }
      return
    }

    if (!this.isExpose) { console.log('➜ Network: use --host to expose') }
  }

  // getters
  getIpv4 () {
    return this.ipv4
  }

  getHost () {
    return this.host
  }
}
