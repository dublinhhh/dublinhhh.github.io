
begin
  require 'safe_yaml'
rescue LoadError => e
  STDERR.puts("Please install gems first: #{e.message}")
  exit(1)
end

require 'uri'
require 'net/http'

# taken from jekyll
YAML_FRONT_MATTER_REGEXP = %r!\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)!m.freeze

GOOGLE_URL_LAT_LONG = %r!/@(-?\d+\.\d+),(-?\d+\.\d+)[,/]!.freeze
def add_location(data)
  if data['map_url']
    if data['map_url'] !~ GOOGLE_URL_LAT_LONG
      # not in the url, try loading the page and see if we get a redirect with location
      uri = URI(data['map_url'])
      res = Net::HTTP.get_response(uri)
      res.header['location'] =~ GOOGLE_URL_LAT_LONG if res.is_a? Net::HTTPFound
    end

    if Regexp.last_match
      data['latitude'] = Regexp.last_match(1)
      data['longitude'] = Regexp.last_match(2)
    end
  end
end

# read contents of filename, returns body and YAML frontmatter if present
def load_file(filename)
  data = { }
  body = File.read(filename)
  if body =~ YAML_FRONT_MATTER_REGEXP
    data = SafeYAML.load(Regexp.last_match(1))
    body = Regexp.last_match.post_match
  end

  return body, data
end

# write YAML frontmatter and contents to filename
def save_file(filename, data, body=nil)
  File.open(filename, 'w') do |file|
    file.puts(YAML.dump(data))
    file.puts('---')
    file.puts(body) if body
  end
end

