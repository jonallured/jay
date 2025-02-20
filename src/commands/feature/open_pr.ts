import { Command } from "@oclif/core"
import { Jay } from "../../shared/Jay"
import { computePrBody } from "../../helpers/feature"

export default class OpenPr extends Command {
  static description = "Open PR on upstream from feature branch."

  async run(): Promise<void> {
    const currentBranchCommand = "git branch --show-current"
    const branchName = Jay.utils.exec(currentBranchCommand)

    const getDescriptionCommand = `git config --get branch.${branchName}.description`
    const branchDescription = Jay.utils.exec(getDescriptionCommand)
    const branchInfo = JSON.parse(branchDescription)
    const { jiraLinks, prTitle } = branchInfo

    const renameBranchCommand = `git branch -m jonallured/${branchName}`
    Jay.utils.exec(renameBranchCommand)

    const pushCommand = `git push --set-upstream upstream HEAD`
    Jay.utils.exec(pushCommand)

    let prCommand = `gh pr create --title '${prTitle}' --web`

    const projectName = `basename "$PWD"`
    const prBody = computePrBody(projectName, jiraLinks)
    if (prBody) {
      prCommand = `${prCommand} --body '${prBody}'`
    }

    Jay.utils.exec(prCommand)
  }
}
