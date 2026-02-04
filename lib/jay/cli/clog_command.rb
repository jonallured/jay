module Jay
  module Cli
    class ClogCommand < Thor
      desc "fetch PR_NUMBER", "Fetch and format PR_NUMBER"
      def fetch(pr_number)
        command = "gh pr view #{pr_number} --json title,url"
        result = `#{command}`
        json = JSON.parse(result)
        pr_title = json["title"]
        pr_url = json["url"]

        output = <<~EOF
          * #{pr_title} ([##{pr_number}][])
          [##{pr_number}]: #{pr_url}
        EOF

        say output
      end

      desc "fresh", "Output fresh section headings"
      def fresh
        output = <<~EOF
          ### Added

          ### Changed

          ### Deprecated

          ### Removed

          ### Fixed

          ### Security
        EOF

        say output
      end
    end
  end
end
