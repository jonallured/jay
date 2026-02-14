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

      desc "remigrate", "Update timestamp on migration file."
      def remigrate(starting_file)
        basename = File.basename(starting_file)
        suffix = basename.sub(/^\d{14}/, "")
        new_timestamp = Time.now.strftime("%Y%m%d%H%M%S")
        dirname = File.dirname(starting_file)
        updated_file = File.join(dirname, "#{new_timestamp}#{suffix}")

        File.rename(starting_file, updated_file)
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
