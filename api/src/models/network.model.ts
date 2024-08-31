import os from 'os'
import pc from 'picocolors'

const LOCALHOST = '127.0.0.1'

export default class NetworkModel {
  private port: any
  private isExpose: any
  private host: string
  private ipv4: any

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
    console.clear()
    console.log(`\n ${pc.green(pc.bold('ALADDIN API'))} ${pc.gray('server running on')}`)
    console.log(`\n ${pc.green('➜')}  Local:   ${pc.yellow(`http://localhost:${this.port}/`)}`)

    if (this.isExpose) {
      for (const net of this.ipv4) {
        if (net.address !== LOCALHOST) { console.log(` ${pc.green('➜')}  Network: ${pc.yellow(`http://${net.address}:${this.port}/`)}`) }
      }
      return
    }

    if (!this.isExpose) { console.log(` ${pc.green('➜')} ${pc.gray(' Network: use')} --host ${pc.gray('to expose')}`) }
  }

  // getters
  getIpv4 () {
    return this.ipv4
  }

  getHost () {
    return this.host
  }
}
