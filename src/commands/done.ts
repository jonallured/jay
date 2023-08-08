import { Command } from "@oclif/core"
import { Jay } from "../shared/Jay"

export default class Done extends Command {
  static description = "Announce when things are done."

  async run(): Promise<void> {
    const basenameCommand = "basename `pwd`"
    const basename = Jay.utils.exec(basenameCommand)

    const leapCommand = `unicornleap --seconds 1`
    const sayCommand = `say ${basename} done -v Daniel`
    Jay.utils.exec(`${sayCommand} & ${leapCommand}`)
  }
}
