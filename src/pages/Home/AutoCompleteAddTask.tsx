import { Box, TextField, Autocomplete } from '@mui/material'
import { Fragment } from 'react'
import { List } from '../../types/list'
import type { Dispatch, SetStateAction } from 'react'
import { Tag } from '../../types/tag'

type AutoCompleteAddTask = {
  categories: List[]
  setListId: Dispatch<SetStateAction<number | null>>
  tags: Tag[]
  setTagId: Dispatch<SetStateAction<number | null>>
}

function AutoCompleteAddTask(props: AutoCompleteAddTask) {
  const { categories, setListId, tags, setTagId } = props

  return (
    <Fragment>
      <Box sx={{ p: 0, mt: '10px' }}>
        <Autocomplete
          disablePortal
          options={categories}
          fullWidth
          getOptionLabel={option => option.name}
          onChange={(_, newValue) => {
            if (newValue) {
              setListId(newValue.id)
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Categoria"
              sx={{
                '& .MuiInputBase-root': {
                  height: '44px',
                  fontSize: '1.1rem',
                },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
        />
      </Box>
      <Box sx={{ p: 0, mt: '10px', mb: '30px' }}>
        <Autocomplete
          disablePortal
          options={tags}
          fullWidth
          getOptionLabel={option => option.name}
          onChange={(_, newValue) => {
            if (newValue) {
              setTagId(newValue.id)
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="Tag"
              sx={{
                '& .MuiInputBase-root': {
                  height: '44px',
                  fontSize: '1.1rem',
                },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
        />
      </Box>
    </Fragment>
  )
}

export default AutoCompleteAddTask
