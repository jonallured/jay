export const computeBranchName = (
  featureName: string,
  featureType: string,
  buildMe: boolean,
): string => {
  const cleanedName = featureName.replace(/[^a-zA-Z0-9 ]/g, "")
  const parts = [featureType, ...cleanedName.split(" ")]
  if (buildMe) {
    parts.push("build-me")
  }
  const branchName = parts.join("-").toLowerCase()
  return branchName
}

const baseJiraURL = "https://artsyproduct.atlassian.net/browse/"

export const computeJiraLinks = (jiraTickets: string[]): string[] => {
  const links = jiraTickets.map((ticket) => [baseJiraURL, ticket].join(""))
  return links
}

export const placeholderPrBody =
  "This is a placeholder - please update with an awesome PR description!"

export const teamMention = "/cc @artsy/amber-devs"

const projectsToSkip = ["eigen", "energy"]

export const computePrBody = (
  projectName: string,
  jiraLinks: string[],
): string | undefined => {
  const skipBody = projectsToSkip.includes(projectName)
  if (skipBody) return

  const tickets = jiraLinks.join("\n")
  const body = [placeholderPrBody, tickets, teamMention]
    .filter(Boolean)
    .join("\n\n")
  return body
}

export const computePrTitle = (
  featureName: string,
  featureType: string,
  jiraTickets: string[],
): string => {
  const prefix = `${featureType}:`
  const suffix = jiraTickets[0]

  const parts = [prefix, featureName, suffix].filter(Boolean)
  const title = parts.join(" ")

  return title
}
