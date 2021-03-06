import { JayUtils } from "./JayUtils"

export class JayConfig {
  static instance: JayConfig

  static init = (): JayConfig => {
    if (JayConfig.instance) return JayConfig.instance

    const sshDir = [JayUtils.getHomedir(), ".ssh"].join("/")
    return new JayConfig(sshDir)
  }

  dotHomePath: string
  gitHubToken: string
  keysDir: string
  keysFilePath: string
  safelistFilePath: string
  sshDir: string
  symlinkPath: string
  unmanagedFilePath: string

  constructor(sshDir: string) {
    this.dotHomePath = process.env["DOTHOME"] || "invalid"
    this.gitHubToken = process.env["JAY_GH_TOKEN"] || "invalid"
    this.sshDir = sshDir
    this.keysDir = [this.sshDir, "keys"].join("/")
    this.keysFilePath = [this.keysDir, "authorized.keys"].join("/")
    this.safelistFilePath = [this.keysDir, "safelist"].join("/")
    this.symlinkPath = [this.sshDir, "authorized_keys"].join("/")
    this.unmanagedFilePath = [this.keysDir, "unmanaged.keys"].join("/")

    JayConfig.instance = this
  }
}

JayConfig.init()
