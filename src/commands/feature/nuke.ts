import { Args, Command } from "@oclif/core"
import { Jay } from "../../shared/Jay"

export default class Nuke extends Command {
  static description = "Nuke a feature branch."

  static args = {
    branchName: Args.string({
      description: "Name of branch to be nuked.",
      required: true,
    }),
  }

  async run(): Promise<void> {
    const { args } = await this.parse(Nuke)
    const { branchName } = args

    const localCommand = `git branch -D ${branchName} || echo nope`
    Jay.utils.exec(localCommand)

    const upstreamCommand = `git push upstream --delete ${branchName} || echo nope`
    Jay.utils.exec(upstreamCommand)

    const originBranchName = branchName.split("/").pop()
    const originCommand = `git push origin --delete ${originBranchName} || echo nope`
    Jay.utils.exec(originCommand)
  }
}
