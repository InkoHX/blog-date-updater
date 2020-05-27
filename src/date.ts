import { exec } from './util'
import { resolve } from 'path'

/**
 * Get the modified date of the file from Git and convert it to Date. If there is no modification date, the creation date is returned.
 * @param path target path
 */
export const getModifiedDate = async (path: string): Promise<Date> => {
  const { stdout, stderr } = await exec([
    'git',
    'log',
    '-1',
    '--diff-filter=MA',
    '--follow',
    '--format=%ad',
    resolve(path)
  ].join(' '), { cwd: process.cwd() })

  if (stderr) throw new Error(stderr)

  return new Date(stdout)
}

/**
 * Get the creation date of the file from Git and convert it to Date.
 * @param path target path
 */
export const getCreatedDate = async (path: string): Promise<Date> => {
  const { stdout, stderr } = await exec([
    'git',
    'log',
    '-1',
    '--diff-filter=A',
    '--follow',
    '--format=%ad',
    resolve(path)
  ].join(' '), { cwd: process.cwd() })

  if (stderr) throw new Error(stderr)

  return new Date(stdout)
}
