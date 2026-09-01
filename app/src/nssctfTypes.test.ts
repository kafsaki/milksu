// @vitest-environment jsdom

import { afterEach, describe, expect, it } from 'vitest'

import { applyUiLocale } from './lib/uiLocale'
import { challengeFromNSSCTFAPI, normalizeNSSCTFProblemURL } from './nssctfTypes'

const validPayload = {
  code: 200,
  data: {
    pid: 42,
    title: 'Header Hunt',
    desc: '',
    point: 100,
    type: 1,
    level: 2,
    docker: false,
    annex: false,
    tag: [],
    info: { solved: 1, wa: 0, wp: 0 },
  },
}

describe('NSSCTF user-facing messages', () => {
  afterEach(() => applyUiLocale('zh'))

  it('localizes invalid challenge URLs', () => {
    applyUiLocale('en')
    expect(() => normalizeNSSCTFProblemURL('not a challenge URL'))
      .toThrow('Enter a challenge ID or a link in the form https://www.nssctf.cn/problem/{id}')
  })

  it('localizes invalid API responses and empty descriptions', () => {
    applyUiLocale('en')
    expect(() => challengeFromNSSCTFAPI({ ...validPayload, code: 500 }, 42))
      .toThrow('NSSCTF did not return a valid challenge')
    expect(challengeFromNSSCTFAPI(validPayload, 42).statement)
      .toBe('NSSCTF did not provide a public description; check the platform for the environment, attachments, and requirements.')
  })
})
