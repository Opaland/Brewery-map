import { describe, expect, it } from 'vitest'
import { jourFerie } from '../../src/core/feries'

describe('S91 CA1 : les jours fériés de France métropolitaine', () => {
  it('les dates fixes', () => {
    expect(jourFerie(2026, '01-01')).toBe('jour de l’an')
    expect(jourFerie(2026, '05-01')).toBe('1er mai')
    expect(jourFerie(2026, '05-08')).toBe('8 mai')
    expect(jourFerie(2026, '07-14')).toBe('14 juillet')
    expect(jourFerie(2026, '08-15')).toBe('15 août')
    expect(jourFerie(2026, '11-01')).toBe('Toussaint')
    expect(jourFerie(2026, '11-11')).toBe('11 novembre')
    expect(jourFerie(2026, '12-25')).toBe('Noël')
  })

  it('les dates qui suivent Pâques (2026 : 5 avril ; 2027 : 28 mars)', () => {
    expect(jourFerie(2026, '04-06')).toBe('lundi de Pâques')
    expect(jourFerie(2026, '05-14')).toBe('Ascension')
    expect(jourFerie(2026, '05-25')).toBe('lundi de Pentecôte')
    expect(jourFerie(2027, '03-29')).toBe('lundi de Pâques')
    expect(jourFerie(2027, '05-06')).toBe('Ascension')
    expect(jourFerie(2027, '05-17')).toBe('lundi de Pentecôte')
    // 2038 : Pâques le 25 avril, la plus tardive du siècle.
    expect(jourFerie(2038, '04-26')).toBe('lundi de Pâques')
  })

  it('un jour ordinaire n’est pas férié', () => {
    expect(jourFerie(2026, '10-19')).toBeUndefined()
    expect(jourFerie(2026, '04-05')).toBeUndefined()
    expect(jourFerie(2026, '12-26')).toBeUndefined()
  })
})
