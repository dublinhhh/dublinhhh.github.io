#!/usr/bin/env ruby

# this script takes one filename as argument and processes the frontmatter
# - sets the last_modified_at time to the date this is run (unless the '-n' argument is supplied)
# - sets the ordinal date field if there's a date attribute
# - quotes the time if there's a time attribute
# - If the file is a photo record (because it has '_photos/' in its file name) and it also has a date and a hash,
#   it is added to the photo gallery for the corresponding run

require 'jekyll'
require 'safe_yaml'

# taken from jekyll
YAML_FRONT_MATTER_REGEXP = %r!\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)!m.freeze

# reads contents of filename, returns body and YAML frontmatter if present
def load_file(filename)
  data = { }
  body = File.read(filename)
  if body =~ YAML_FRONT_MATTER_REGEXP
    data = SafeYAML.load(Regexp.last_match(1))
    body = Regexp.last_match.post_match
  end

  return body, data
end

# writes YAML frontmatter and contents to filename
def save_file(filename, data, body)
  File.open(filename, 'w') do |file|
    file.puts(YAML.dump(data))
    file.puts('---')
    file.puts(body)
  end
end

begin
  update_last_modified = true
  if ARGV[0] == '-n'                                      # don't update last modified date (used when re-syncing)
    update_last_modified = false
    ARGV.shift
  end

  if ARGV.size != 1
    $stderr.puts 'Filename required'
    exit
  end

  filename = ARGV[0]
  body, data = load_file(filename)
  original_data = data.dup

  # set ordinal date if a date (used for sorting by date in jekyll where_exp)
  # jekyll site.time is a date object complete with time; you cannot create a date-only oject
  # converting it to a string with 'date: %Y-%m-%d' makes a string that cannot be used to sort
  if data.key?('date')
    data['ordinal_date'] = data['date'].strftime('%Y%m%d').to_i
  end

  if update_last_modified
    data['last_modified_at'] = Time.now.strftime('%Y-%m-%d')
  end

  if data != original_data                            # avoid unnecessary file writes
    save_file(filename, data, body)
  end

  # if the file is a photo record and there's a matching run, add this photo to its gallery
  if filename.include? '_photos/'
    # we're done with original 'filename', so we'll re-use it so that err messages are clear
    # beware: this is fragile, it must match the config in admin/config.yml
    filename = Jekyll::Utils.slugify("_hareline/#{data['date']}-#{data['hash']}.md", mode: 'raw')

    if File.exist?(filename)                          # get the run data if there's a corresponding run
      run_body, run_data = load_file(filename)
      original_run_data = run_data.dup

      gallery = (run_data['gallery'] ||= [ ])         # get or create the gallery (it is just an array of objects)

      # look for an existing entry that has same path or external url
      index = gallery.index { |elt| elt['image_path'] && elt['image_path'] == data['image_path'] ||
                                    elt['url'] && elt['url'] == data['url'] }
      if index.nil?                                   # add a new image at end if no match found
        gallery << { }
        index = -1
      end

      gallery[index]['url'] = data['url']
      gallery[index]['image_path'] = data['image_path']
      gallery[index]['title'] = data['title']

      if update_last_modified
        run_data['last_modified_at'] = Time.now.strftime('%Y-%m-%d')
      end

      if run_data != original_run_data                  # avoid unnecessary file writes
        save_file(filename, run_data, run_body)
      end
    end
  end
rescue Psych::SyntaxError => e
  $stderr.puts "YAML Exception reading #{filename}: #{e.message}"
rescue StandardError => e
  $stderr.puts "Error processing file #{filename}: #{e.message}"
end
