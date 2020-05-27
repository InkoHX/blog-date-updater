import { promises as fs } from 'fs'
import { safeDump, safeLoad } from 'js-yaml'

import { getCreatedDate, getModifiedDate } from './date'

const MARKDOWN_YAML_PATTERN = /^-{3}\n(?<code>[\s\S]+)\n-{3}$/um

export const overWrite = async (path: string): Promise<void> => {
  const data = await fs.readFile(path, 'utf8')
  const metadata = Object.assign(parseMarkdownYAML(data), {
    modifiedDate: await getModifiedDate(path),
    createdDate: await getCreatedDate(path)
  })

  // eslint-disable-next-line
  return fs.writeFile(path, data.replace(MARKDOWN_YAML_PATTERN, `---\n${safeDump(metadata)}---`), 'utf8')
}

export const parseMarkdownYAML = (data: string): Record<string, unknown> => {
  const yamlHeader = MARKDOWN_YAML_PATTERN.exec(data)?.groups?.code

  if (!yamlHeader) throw new Error('The YAML header was not found.')

  // eslint-disable-next-line
  return safeLoad(yamlHeader)
}
