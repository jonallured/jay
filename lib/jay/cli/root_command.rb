module Jay
  module Cli
    class RootCommand < Thor
      desc "clog", "CHANGELOG commands"
      subcommand "clog", ClogCommand

      desc "done", "Announce when things are done."
      def done
        basename = `basename $(pwd)`.chomp
        leap_command = "unicornleap --seconds 1"
        say_command = "say #{basename} done -v Daniel"
        system("#{say_command} & #{leap_command} &")
      end

      desc "version", "Print the version"
      def version
        say Jay::VERSION
      end

      def self.basename
        "jay"
      end

      def self.exit_on_failure?
        true
      end
    end
  end
end
