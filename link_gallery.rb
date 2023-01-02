#!/usr/bin/env ruby

# this script takes one filename as argument
# if it is a photo (because it has '_photos/' in its name) and it also has a date and a hash,
# it is added to the photo gallery for the corresponding run

require 'jekyll'
require 'safe_yaml'

if ARGV.size != 1
  $stderr.puts 'Filename required'
  exit
end

# taken from jekyll
YAML_FRONT_MATTER_REGEXP = %r!\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)!m.freeze

begin
  filename = ARGV[0]
  if filename.include? '_photos/'
    photo_contents = File.read(filename)            # get photo data
    if photo_contents =~ YAML_FRONT_MATTER_REGEXP
      photo_body = Regexp.last_match.post_match
      photo_data = SafeYAML.load(Regexp.last_match(1))

      # if there's a matching run, add this photo to its gallery
      if photo_data['date'] && photo_data['hash']
        # this is fragile -- must match the config in admin/config.yml
        run_file = Jekyll::Utils.slugify("_hareline/#{photo_data['date']}-#{photo_data['hash']}.md", mode: 'raw')

        if File.exist?(run_file)                    # get the run data if there's a corresponding run
          run = File.read(run_file)
          if run =~ YAML_FRONT_MATTER_REGEXP
            run_body = Regexp.last_match.post_match
            run_data = SafeYAML.load(Regexp.last_match(1))

            # get or create the gallery (it is just an array of objects)
            gallery = (run_data['gallery'] ||= [ ])
            # look for an existing entry that has same path or external url
            index = gallery.index { |elt| elt['image_path'] && elt['image_path'] == photo_data['image_path'] ||
                                          elt['url'] && elt['url'] == photo_data['url'] }
            if index.nil?         # add a new image if no match found
              gallery << { }
              index = -1
            end
            gallery[index]['url'] = photo_data['url']
            gallery[index]['image_path'] = photo_data['image_path']
            gallery[index]['title'] = photo_data['title']

            run_data['last_modified_at'] = Time.now.strftime('%Y-%m-%d')
          end

          # write the run data with updated gallery
          File.open(run_file, 'w') do |file|
            file.puts(YAML.dump(run_data))
            file.puts('---')
            file.puts(run_body)
          end
        end
      end
    end
  end
rescue Psych::SyntaxError => e
  $stderr.puts "YAML Exception reading #{filename}: #{e.message}"
rescue StandardError => e
  $stderr.puts "Error reading file #{filename}: #{e.message}"
end

