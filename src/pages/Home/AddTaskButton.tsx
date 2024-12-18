import { useState } from 'react'
import { Button, Menu, Box, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ptBR } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { List, Tag } from '@/types'
import { addTask, devUser, queryClient, AddTaskParams } from '@/utils'
import BotaoPadrao from '@/components/BotaoPadrao'
import Input from '@/components/Input'

import AutoCompleteAddTask from './AutoCompleteAddTask'
import MultiSelect from '@/components/MultiSelect'

type AddTaskButtonProps = {
  categories: List[]
  tags: Tag[]
}

function AddTaskButton(props: AddTaskButtonProps) {
  const { categories, tags } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [listId, setListId] = useState<number | null>(null)
  const [tagId, SetTagId] = useState<number[]>([])

  const { mutate } = useMutation({
    mutationFn: (params: AddTaskParams) => addTask(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa adicionada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao adicionar a tarefa!')
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setTitle('')
    setDueDate(null)
    setDescription('')
    setListId(null)
    SetTagId([])
  }

  const handleSubmit = () => {
    mutate({ title, dueDate, userId: devUser, description, listId, tagId })
    handleClose()
    setTitle('')
    setDueDate(null)
    setDescription('')
    setListId(null)
    SetTagId([])
  }

  return (
    <Box sx={{ maxWidth: { md: '50%' }, mb: 4 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        fullWidth
      >
        Adicionar tarefa
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: '-62px' }}
        slotProps={{
          paper: {
            sx: {
              height: '684px',
              width: anchorEl?.clientWidth || 'auto',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <Box sx={{ p: 0, mt: '0px' }}>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            label="Título da tarefa"
            value={title}
            style={{ marginTop: '-8px' }}
          />
        </Box>
        <Box sx={{ p: 0, mt: '4px' }}>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            label="Descrição"
            value={description}
            style={{ marginTop: '-8px' }}
          />
        </Box>
        <AutoCompleteAddTask categories={categories} setListId={setListId} />
        <MultiSelect tags={tags} setTagId={SetTagId} taskTagsId={[]} />
        <Box>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DateCalendar
              value={dueDate}
              onChange={setDueDate}
              sx={{
                width: '335px',
                '& .MuiPickersArrowSwitcher-root': {
                  justifyContent: 'space-between',
                  '& button': { ml: '4px' },
                },
                '& .MuiTypography-root': {
                  fontSize: '1.1rem',
                  margin: '0px 5px',
                },
                '& .MuiPickersCalendarHeader-label': { fontSize: '1.2rem' },
                '& .MuiPickersDay-root': {
                  fontSize: '1.1rem',
                  margin: '4px 5px',
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="center"
          sx={{ mt: '17px' }}
        >
          <BotaoPadrao action={handleClose} buttonName="Cancelar" />
          <BotaoPadrao action={handleSubmit} buttonName="Adicionar" />
        </Stack>
      </Menu>
    </Box>
  )
}

export default AddTaskButton
