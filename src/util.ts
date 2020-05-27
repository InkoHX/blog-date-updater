import globCallback from 'glob'
import { exec as execCallback } from 'child_process'
import { promisify } from 'util'

export const glob = promisify(globCallback)

export const exec = promisify(execCallback)
