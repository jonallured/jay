import { Args, Command, Flags } from "@oclif/core"
import { Jay } from "../../shared/Jay"
import {
  computeBranchName,
  computeJiraLinks,
  computePrTitle,
} from "../../helpers/feature"

const featureTypes = [
  "chore",
  "docs",
  "feat",
  "fix",
  "refactor",
  "style",
  "test",
]

export default class Start extends Command {
  static description = "Start a feature branch."

  static args = {
    featureName: Args.string({
      description: "Name of the feature being worked.",
      required: true,
    }),
    featureType: Args.string({
      default: "feat",
      description: "Type of the feature being worked.",
      options: featureTypes,
      required: true,
    }),
  }

  static flags = {
    buildMe: Flags.boolean({
      char: "b",
      default: false,
      description: "Whether to append build-me to branch name.",
      required: false,
    }),
    jira: Flags.string({
      char: "j",
      default: [],
      description: "Jira ticket number like this: DIA-4.",
      multiple: true,
      required: false,
    }),
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Start)

    const { featureName, featureType } = args
    const { buildMe, jira } = flags
    const jiraTickets = jira ?? []

    const branchName = computeBranchName(featureName, featureType, buildMe)
    const prTitle = computePrTitle(featureName, featureType, jiraTickets)

    const jiraLinks = computeJiraLinks(jiraTickets)

    const newBranchCommand = `git checkout -b ${branchName}`
    Jay.utils.exec(newBranchCommand)

    const pushCommand = `git push --set-upstream origin ${branchName}`
    Jay.utils.exec(pushCommand)

    const branchInfo = {
      jiraLinks,
      prTitle,
    }
    const branchDescription = JSON.stringify(branchInfo)
    const setDescriptionCommand = `git config branch.${branchName}.description '${branchDescription}'`
    Jay.utils.exec(setDescriptionCommand)
  }
}
