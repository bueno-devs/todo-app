import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function showDate(date: Date | null | string) {
  if (!date) return 'Erro ao tratar data'
  return format(date, "EEEE dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}
