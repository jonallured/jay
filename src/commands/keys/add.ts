import { Command } from "@oclif/core"
import { Jay } from "../../shared/Jay"
import { updateKeys, updateSafelist } from "../../helpers/keys"

export default class Add extends Command {
  static description = "add a user to the safelist (then update)"

  static strict = false

  async run(): Promise<void> {
    const { argv } = await this.parse(Add)
    const appendList = argv as string[]

    if (appendList.length > 0) {
      updateSafelist(Jay.config, appendList, [])
      updateKeys(Jay.config)
    }
  }
}
