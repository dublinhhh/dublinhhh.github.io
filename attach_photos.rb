#!/usr/bin/env ruby

require 'digest'
require 'fileutils'

begin
  require 'exifr/jpeg'
rescue LoadError => e
  STDERR.puts("Please install gems first: #{e.message}")
  exit(1)
end

require_relative './front_matter.rb'

def sanitize_filename(name)
  name.gsub(%r{[^\w\s\.-]}, '-')
      .gsub(%r{\s+}, '_')
      .gsub(%r{\.+}, '.')
      .downcase
end

def add_photo_to_assets(filename, destination)
  path = "/assets/images/#{destination}"
  FileUtils.copy(filename, path)

  path
end

def add_photo(filename, date, caption=nil)
  digest = Digest::MD5.hexdigest(File.read(filename))

  destination = sanitize_filename("#{date}-#{ caption&.empty? ? digest : caption }")
  asset_path = add_photo_to_assets(filename, destination)

  photo_data = {
    'title' => caption,
    'image_path' => asset_path,
    'date' => date,
    'ordinal_date' => Integer(date.to_s.gsub('-', '')),
    'last_modified_at' => Time.now.strftime('%Y-%m-%d'),
  }
  photo_path = "_photos/#{destination}"
  save_file(photo_path, photo_data)

  return photo_path, asset_path
end

# unfortunately whatsapp strips date (another metadata) from the file
def get_date(filename)
  exif = EXIFR::JPEG.new(filename)
  timestamp = exif.date_time
  if timestamp.is_a? Time
    date = timestampe.strftime('%F')
  else
    # see if you can find it in the filename (whatsapp downloads)
    match = filename.match(/ (\d{4}-\d{2}-\d{2}) /)
    date = match[1] if match
  end

  while date !~ /\d{4}-\d{2}-\d{2}/
    print "Date (YYYY-MM-DD): "
    response = STDIN.gets
    response.chomp!
    date = response unless response.empty?
  end

  #loop do
  #  print "Date (YYYY-MM-DD) [#{date}]: "
  #  response = STDIN.gets
  #  response.chomp!
  #  date = response unless response.empty?
  #  break if date =~ /\d{4}-\d{2}-\d{2}/
  #end

  date
end

def process(filename)
  unless File.exist?(filename)
    puts "File does not exist: '#{filename}', skipping"
  end

  system('imgcat', filename)
  puts filename

  date = get_date(filename)

  # look for most recent run
  day = Time.new(date)
  run = nil
  (0..5).each do |i|
    # does not handle 2 hashes on same day
    run = Dir.glob("_hareline/#{(day-i).strftime("%F")}-*").first
    break if run
  end

  unless run
    puts "Unable to find run matching '#{date}', skipping"
    return
  end

  run_body, run_data = load_file(run)
  original_run_data = Marshal.load(Marshal.dump(run_data))      # deep copy

  date = run_data['date']      # run date overrides filename date...

  # add the photo to the repo
  puts "#{date} #{run_data['hash']}"
  print 'Caption: '
  caption = STDIN.gets.chomp

  photo_path, image_path = add_photo(filename, date, caption)
  modified = [ photo_path, image_path ]

  gallery = (run_data['gallery'] ||= [ ])         # get or create the gallery (it is just an array of objects)

  # look for an existing entry that has same path
  index = gallery.index { |elt| elt['image_path'] && elt['image_path'] == image_path }
  if index.nil?                                   # add a new image at end if no match found
    gallery << { }
    index = -1
  end

  gallery[index]['url'] = nil
  gallery[index]['image_path'] = image_path
  gallery[index]['title'] = caption

  run_data['last_modified_at'] = Time.now.strftime('%Y-%m-%d')
  if run_data != original_run_data                  # avoid unnecessary file writes
    save_file(run, run_data, run_body)
    modified << run
  end

  modified
end

changes = [ ]
ARGV.each do |file|
  begin
    changes << process(file)
  rescue Errno::EPERM => e
    puts "Unable to open file: #{e}"
  end
end

changes.each { |files| puts "git add #{files.join(' ')}" }

