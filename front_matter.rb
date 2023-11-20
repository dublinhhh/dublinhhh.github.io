
begin
  require 'safe_yaml'
rescue LoadError => e
  STDERR.puts("Please install gems first: #{e.message}")
  exit(1)
end

# taken from jekyll
YAML_FRONT_MATTER_REGEXP = %r!\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)!m.freeze

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

