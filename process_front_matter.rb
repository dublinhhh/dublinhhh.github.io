#!/usr/bin/env ruby

# this script takes one filename as argument and processes the frontmatter
# - sets the last_modified_at time to the date this is run (unless the '-n' argument is supplied)
# - sets the ordinal date field if there's a date attribute
# - If the file is a photo record (because it has '_photos/' in its file name) and it also has a date and a hash,
#   it is added to the photo gallery for the corresponding run

require 'jekyll'

require_relative './front_matter.rb'

# beware: this is fragile, it must match the config in admin/config.yml
def run_pathname(date, hash)
  Jekyll::Utils.slugify("_hareline/#{date}-#{hash}.md", mode: 'raw')
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

  # set dow (day of week) if a date
  # set ordinal date if a date (used for sorting by date in jekyll where_exp)
  # jekyll site.time is a date object complete with time; you cannot create a date-only oject
  # converting it to a string with 'date: %Y-%m-%d' makes a string that cannot be used to sort
  if data.key?('date')
    start_date = data['date']
    data['ordinal_date'] = start_date.strftime('%Y%m%d').to_i
    data['dow'] = start_date.strftime('%u').to_i
    data['date_display'] = start_date.strftime('%e %B %Y').strip

    if data.key?('end_date') && data['end_date'].is_a?(Date)
      end_date = data['end_date']
      # if there an end date, we'll compress it to '3-5 July 2026' or '30 July-2 August 2026'
      if start_date.year == end_date.year && start_date.month == end_date.month    # Same month: '3-5 July 2026'
        data['date_display'] = "#{start_date.strftime('%e').strip}&ndash;#{end_date.strftime('%e %B %Y').strip}"
      elsif start_date.year == end_date.year # Same year, different months: '30 July-2 August 2026'
        data['date_display'] = "#{start_date.strftime('%e %B').strip}&ndash;#{end_date.strftime('%e %B %Y').strip}"
      else # Different years: '30 July 2025-2 August 2026'
        data['date_display'] = "#{start_date.strftime('%e %B %Y').strip}&ndash;#{end_date.strftime('%e %B %Y').strip}"
      end
    end
  end

  if !data.key?('last_modified_at')
    data['last_modified_at'] = Time.now.strftime('%Y-%m-%d')
  end

  add_location(data)

  if data != original_data                            # avoid unnecessary file writes
    save_file(filename, data, body)
  end

  # if the file is a photo record and there's a matching run, add this photo to its gallery
  if filename.include? '_photos/'
    date = data['date']
    hashes = [ 'Dublin H3', 'I ♥ Monday' ]
    matches = hashes.select do |hash|
      File.exist?(run_pathname(date, hash))
    end

    if matches.size == 1            # Only 1 hash on the supplied date, don't bother using the hash name input
      hash = matches.first
    else                            # More than 1 match, use the supplied hash name
      hash = data['hash']
    end

    # we're done with original 'filename', so we'll re-use it so that err messages are clear
    filename = run_pathname(date, hash)

    # as long as the input is on the list of hashes above it will exist, but verify here just in case
    if File.exist?(filename)                          # get the run data if there's a corresponding run
      run_body, run_data = load_file(filename)
      original_run_data = Marshal.load(Marshal.dump(run_data))      # deep copy

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

      if run_data != original_run_data                  # avoid unnecessary file writes
        if update_last_modified
          run_data['last_modified_at'] = Time.now.strftime('%Y-%m-%d')
        end

        save_file(filename, run_data, run_body)
      end
    end
  end
rescue Psych::SyntaxError => e
  $stderr.puts "YAML Exception reading #{filename}: #{e.message}"
rescue StandardError => e
  $stderr.puts "Error processing file #{filename}: #{e.message}"
end
