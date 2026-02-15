import * as vscode from 'vscode'
import cjkBreaks from '@peaceroad/markdown-it-cjk-breaks-mod'
import strongJa from '@peaceroad/markdown-it-strong-ja'

const CONFIG_SECTION = 'p7dMarkdownItLinebreak'
const STRONG_JA_CORE_RULES = ['cjk_breaks']
const STRONG_JA_DEFAULT_MODE = 'japanese-boundary-guard'
const STRONG_JA_DEFAULT_POSTPROCESS = true
const STRONG_JA_DEFAULT_MDIT_ATTRS = true
const STRONG_JA_DEFAULT_PATCH_CORE_PUSH = true

const getBoolean = (config, key, fallback) => {
  const value = config.get(key)
  return typeof value === 'boolean' ? value : fallback
}

const getExplicitBoolean = (config, key) => {
  const inspection = config.inspect(key)
  if (!inspection) {
    const value = config.get(key)
    return typeof value === 'boolean' ? value : undefined
  }
  if (typeof inspection.workspaceFolderValue === 'boolean') return inspection.workspaceFolderValue
  if (typeof inspection.workspaceValue === 'boolean') return inspection.workspaceValue
  if (typeof inspection.globalValue === 'boolean') return inspection.globalValue
  return undefined
}

const getDisableSetting = (config, key, fallback, legacyDisableKey, legacyEnableKey) => {
  const explicit = getExplicitBoolean(config, key)
  if (explicit !== undefined) return explicit
  if (legacyDisableKey) {
    const legacyDisable = config.get(legacyDisableKey)
    if (typeof legacyDisable === 'boolean') return legacyDisable
  }
  if (legacyEnableKey) {
    const legacyEnable = config.get(legacyEnableKey)
    if (typeof legacyEnable === 'boolean') return !legacyEnable
  }
  const value = config.get(key)
  return typeof value === 'boolean' ? value : fallback
}

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    const list = value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter(Boolean)
    return list
  }
  if (typeof value !== 'string') return null
  const list = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  return list
}

const buildCjkBreaksOptions = (config) => {
  const disableEither = getDisableSetting(
    config,
    'cjkBreaks.disableEither',
    false,
    null,
    'cjkBreaks.either'
  )
  const disableNormalizeSoftBreaks = getDisableSetting(
    config,
    'cjkBreaks.disableNormalizeSoftBreaks',
    false,
    null,
    'cjkBreaks.normalizeSoftBreaks'
  )
  const options = {
    either: !disableEither,
    normalizeSoftBreaks: !disableNormalizeSoftBreaks,
  }

  const spaceAfterPunctuation = config.get('cjkBreaks.spaceAfterPunctuation')
  const hasSpacing =
    typeof spaceAfterPunctuation === 'string' &&
    spaceAfterPunctuation.length > 0 &&
    spaceAfterPunctuation !== 'none'
  if (hasSpacing) {
    options.spaceAfterPunctuation = spaceAfterPunctuation

    const targetsAdd = config.get('cjkBreaks.spaceAfterPunctuationTargetsAdd')
    const addList = normalizeStringList(targetsAdd)
    if (addList && addList.length > 0) {
      options.spaceAfterPunctuationTargetsAdd = addList
    }

    const targetsRemove = config.get('cjkBreaks.spaceAfterPunctuationTargetsRemove')
    const removeList = normalizeStringList(targetsRemove)
    if (removeList && removeList.length > 0) {
      options.spaceAfterPunctuationTargetsRemove = removeList
    }
  }

  return options
}

const buildStrongJaOptions = (config) => {
  const options = {
    coreRulesBeforePostprocess: STRONG_JA_CORE_RULES,
    postprocess: STRONG_JA_DEFAULT_POSTPROCESS,
    mditAttrs: STRONG_JA_DEFAULT_MDIT_ATTRS,
    patchCorePush: STRONG_JA_DEFAULT_PATCH_CORE_PUSH,
  }

  const modeRaw = config.get('strongJa.mode', STRONG_JA_DEFAULT_MODE)
  if (typeof modeRaw === 'string') {
    const mode = modeRaw.toLowerCase()
    if (mode === 'japanese-boundary' || mode === 'japanese-boundary-guard') {
      options.mode = mode
    } else if (mode === 'aggressive' || mode === 'compatible') {
      options.mode = mode
    }
  }

  const notUsingMditAttrs = getBoolean(config, 'strongJa.notUsingMarkdownItAttrsFeature', false)
  options.mditAttrs = !notUsingMditAttrs

  return options
}

export const activate = async (context) => {
  return {
    extendMarkdownIt(md) {
      const config = vscode.workspace.getConfiguration(CONFIG_SECTION)
      const disableCjkBreaks = getBoolean(config, 'cjkBreaks.disable', false)
      const disableStrongJa = getBoolean(config, 'strongJa.disable', false)
      if (!disableCjkBreaks) {
        md.use(cjkBreaks, buildCjkBreaksOptions(config))
      }
      if (!disableStrongJa) {
        md.use(strongJa, buildStrongJaOptions(config))
      }
      return md
    }
  }
}

export const deactivate = () => {}
