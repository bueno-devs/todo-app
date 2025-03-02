import { Autocomplete } from '@mui/material'
import { Fragment } from 'react'
import { List } from '../types/list'
import Input from './Input'
import type { Dispatch, SetStateAction } from 'react'

type AutoCompleteTaskActionsProps = {
  categories: List[]
  setListId: Dispatch<SetStateAction<number | null | undefined>>
  listId: number | null | undefined
}

/**
 * Componente que renderiza um campo de autocompletar para seleção de categorias
 *
 * @param props - Propriedades do componente
 * @param props.categories - Lista de categorias disponíveis
 * @param props.setListId - Função para atualizar o ID da categoria selecionada
 * @param props.listId - ID da categoria atualmente selecionada, ou null/undefined se nenhuma estiver selecionada
 * @returns O componente AutoCompleteTaskActions
 */
function AutoCompleteTaskActions(props: AutoCompleteTaskActionsProps) {
  const { categories, setListId, listId } = props

  return (
    <Fragment>
      <Autocomplete
        disablePortal
        options={[...categories, { id: null, name: 'Remover Categoria' }]}
        getOptionLabel={(option) => option.name}
        value={categories.find((category) => category.id === listId) || null}
        onChange={(_, newValue) => {
          if (newValue) {
            setListId(newValue.id)
          } else {
            setListId(null)
          }
        }}
        renderInput={(params) => (
          <Input
            style={{ marginTop: '-8px' }}
            {...params.InputProps}
            label="Categoria"
            {...params}
          />
        )}
        fullWidth
        sx={{
          '& .MuiAutocomplete-clearIndicator': {
            display: 'none', // remove o botão
          },
          '& .MuiAutocomplete-popupIndicator': {
            display: 'none', // remove o botão
          },
        }}
      />
    </Fragment>
  )
}

export default AutoCompleteTaskActions
