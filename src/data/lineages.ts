export interface LineageInfo {
  id: string
  label: string
  group: string
}

const GROUP_MCU = 'Heróis & Séries MCU'
const GROUP_SPIDER = 'Homem-Aranha'
const GROUP_XMEN = 'X-Men & Universo Fox'
const GROUP_SONY = 'Universo Sony'
const GROUP_TV = 'Marvel Television'
const GROUP_OTHER = 'Outros clássicos'

export const LINEAGES: LineageInfo[] = [
  { id: 'vingadores', label: 'Vingadores', group: GROUP_MCU },
  { id: 'homem-de-ferro', label: 'Homem de Ferro', group: GROUP_MCU },
  { id: 'hulk', label: 'Hulk', group: GROUP_MCU },
  { id: 'thor', label: 'Thor', group: GROUP_MCU },
  { id: 'capitao-america', label: 'Capitão América', group: GROUP_MCU },
  { id: 'guardioes-da-galaxia', label: 'Guardiões da Galáxia', group: GROUP_MCU },
  { id: 'doutor-estranho', label: 'Doutor Estranho', group: GROUP_MCU },
  { id: 'pantera-negra', label: 'Pantera Negra', group: GROUP_MCU },
  { id: 'viuva-negra', label: 'Viúva Negra', group: GROUP_MCU },
  { id: 'capita-marvel', label: 'Capitã Marvel', group: GROUP_MCU },
  { id: 'homem-formiga', label: 'Homem-Formiga', group: GROUP_MCU },
  { id: 'eternos', label: 'Eternos', group: GROUP_MCU },
  { id: 'shang-chi', label: 'Shang-Chi', group: GROUP_MCU },
  { id: 'loki', label: 'Loki', group: GROUP_MCU },
  { id: 'feiticeira-escarlate', label: 'Feiticeira Escarlate', group: GROUP_MCU },
  { id: 'agatha', label: 'Agatha Harkness', group: GROUP_MCU },
  { id: 'gaviao-arqueiro', label: 'Gavião Arqueiro', group: GROUP_MCU },
  { id: 'cavaleiro-da-lua', label: 'Cavaleiro da Lua', group: GROUP_MCU },
  { id: 'ms-marvel', label: 'Ms. Marvel', group: GROUP_MCU },
  { id: 'ela-hulk', label: 'Ela-Hulk', group: GROUP_MCU },
  { id: 'falcao-soldado-invernal', label: 'Falcão e Soldado Invernal', group: GROUP_MCU },
  { id: 'nick-fury-shield', label: 'Nick Fury / S.H.I.E.L.D.', group: GROUP_MCU },
  { id: 'agente-carter', label: 'Agente Carter', group: GROUP_MCU },
  { id: 'quarteto-fantastico', label: 'Quarteto Fantástico', group: GROUP_MCU },
  { id: 'ironheart', label: 'Ironheart', group: GROUP_MCU },
  { id: 'wonder-man', label: 'Wonder Man', group: GROUP_MCU },
  { id: 'thunderbolts', label: 'Thunderbolts', group: GROUP_MCU },
  { id: 'echo', label: 'Echo', group: GROUP_MCU },

  { id: 'homem-aranha', label: 'Homem-Aranha (todos os estúdios)', group: GROUP_SPIDER },

  { id: 'x-men', label: 'X-Men', group: GROUP_XMEN },
  { id: 'wolverine', label: 'Wolverine', group: GROUP_XMEN },
  { id: 'deadpool', label: 'Deadpool', group: GROUP_XMEN },

  { id: 'venom', label: 'Venom / Universo Sony', group: GROUP_SONY },

  { id: 'demolidor', label: 'Demolidor', group: GROUP_TV },
  { id: 'justiceiro', label: 'Justiceiro', group: GROUP_TV },
  { id: 'jessica-jones', label: 'Jessica Jones', group: GROUP_TV },
  { id: 'luke-cage', label: 'Luke Cage', group: GROUP_TV },
  { id: 'punho-de-ferro', label: 'Punho de Ferro', group: GROUP_TV },
  { id: 'defensores', label: 'Defensores', group: GROUP_TV },
  { id: 'inumanos', label: 'Inumanos', group: GROUP_TV },
  { id: 'fugitivos', label: 'Fugitivos', group: GROUP_TV },
  { id: 'capa-e-punhal', label: 'Capa e Punhal', group: GROUP_TV },
  { id: 'helstrom', label: 'Helstrom', group: GROUP_TV },

  { id: 'blade', label: 'Blade', group: GROUP_OTHER },
  { id: 'outros', label: 'Outras produções', group: GROUP_OTHER },
]

export type LineageId = (typeof LINEAGES)[number]['id']

export const LINEAGE_LABEL: Record<string, string> = Object.fromEntries(LINEAGES.map((l) => [l.id, l.label]))

export const LINEAGE_GROUPS: { group: string; lineages: LineageInfo[] }[] = (() => {
  const order: string[] = []
  const byGroup = new Map<string, LineageInfo[]>()
  for (const l of LINEAGES) {
    if (!byGroup.has(l.group)) {
      byGroup.set(l.group, [])
      order.push(l.group)
    }
    byGroup.get(l.group)!.push(l)
  }
  return order.map((group) => ({ group, lineages: byGroup.get(group)! }))
})()
