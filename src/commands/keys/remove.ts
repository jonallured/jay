import { Command } from "@oclif/core"
import { Jay } from "../../shared/Jay"
import { updateKeys, updateSafelist } from "../../helpers/keys"

export default class Remove extends Command {
  static description = "remove a user from the safelist (then update)"

  static strict = false

  async run(): Promise<void> {
    const { argv } = await this.parse(Remove)
    const removeList = argv as string[]

    if (removeList.length > 0) {
      updateSafelist(Jay.config, [], removeList)
      updateKeys(Jay.config)
    }
  }
}
