import {
  computeBranchName,
  computeJiraLinks,
  computePrBody,
  computePrTitle,
  placeholderPrBody,
  teamMention,
} from "../../src/helpers/feature"

describe("computeBranchName", () => {
  it("prepends the type to the feature name", () => {
    const featureName = "Updates"
    const featureType = "chore"
    const buildMe = false

    const branchName = computeBranchName(featureName, featureType, buildMe)

    expect(branchName).toEqual("chore-updates")
  })

  it("removes case from feature name and replaces spaces with dashes", () => {
    const featureName = "Update list of Repos"
    const featureType = "chore"
    const buildMe = false

    const branchName = computeBranchName(featureName, featureType, buildMe)

    expect(branchName).toEqual("chore-update-list-of-repos")
  })

  it("removes special characters", () => {
    const featureName = "This feature rules!"
    const featureType = "feat"
    const buildMe = false

    const branchName = computeBranchName(featureName, featureType, buildMe)

    expect(branchName).toEqual("feat-this-feature-rules")
  })

  it("treats numbers as letters", () => {
    const featureName = "Step 1: Make the change easy"
    const featureType = "feat"
    const buildMe = false

    const branchName = computeBranchName(featureName, featureType, buildMe)

    expect(branchName).toEqual("feat-step-1-make-the-change-easy")
  })

  it("appends build-me", () => {
    const featureName = "Updates"
    const featureType = "chore"
    const buildMe = true

    const branchName = computeBranchName(featureName, featureType, buildMe)

    expect(branchName).toEqual("chore-updates-build-me")
  })
})

describe("computeJiraLinks", () => {
  describe("with an empty array", () => {
    it("returns an empty array", () => {
      const jiraTickets: string[] = []
      const links = computeJiraLinks(jiraTickets)
      expect(links).toEqual([])
    })
  })

  describe("with one ticket", () => {
    it("returns that ticket with a full URL", () => {
      const jiraTickets = ["GRO-4"]
      const links = computeJiraLinks(jiraTickets)
      expect(links).toEqual(["https://artsyproduct.atlassian.net/browse/GRO-4"])
    })
  })

  describe("with a few tickets", () => {
    it("returns those tickets with full URLs", () => {
      const jiraTickets = ["GRO-4", "CX-7"]
      const links = computeJiraLinks(jiraTickets)
      expect(links).toEqual([
        "https://artsyproduct.atlassian.net/browse/GRO-4",
        "https://artsyproduct.atlassian.net/browse/CX-7",
      ])
    })
  })
})

describe("computePrBody", () => {
  describe("with a project that should have a body and no jira links", () => {
    it("returns the placeholder pr body with team mention", () => {
      const projectName = "gravity"
      const jiraLinks: string[] = []
      const body = computePrBody(projectName, jiraLinks)
      expect(body).toContain(placeholderPrBody)
      expect(body).toContain(teamMention)
    })
  })

  describe("with a project that should skip the body", () => {
    it("returns undefined", () => {
      const projectName = "eigen"
      const jiraLinks: string[] = []
      const body = computePrBody(projectName, jiraLinks)
      expect(body).toBeUndefined()
    })
  })

  describe("with some jira links", () => {
    it("adds those links to the body", () => {
      const projectName = "gravity"
      const jiraLinks = [
        "https://artsyproduct.atlassian.net/browse/GRO-4",
        "https://artsyproduct.atlassian.net/browse/CX-7",
      ]
      const body = computePrBody(projectName, jiraLinks)
      expect(body).toContain(jiraLinks[0])
      expect(body).toContain(jiraLinks[1])
    })
  })
})

describe("computePrTitle", () => {
  it("prepends the type to the feature name", () => {
    const featureName = "Update list of Repos"
    const featureType = "chore"
    const prTitle = computePrTitle(featureName, featureType, [])
    expect(prTitle).toEqual("chore: Update list of Repos")
  })

  it("appends the Jira info to the feature name", () => {
    const featureName = "Update list of Repos"
    const featureType = "chore"
    const jiraTickets = ["GRO-7"]
    const prTitle = computePrTitle(featureName, featureType, jiraTickets)
    expect(prTitle).toEqual("chore: Update list of Repos GRO-7")
  })
})
