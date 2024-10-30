import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Typography, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Card, Input } from '@/components'
import { addUserParams, api } from '@/utils'
import { format } from 'date-fns'

import { Fields, validations } from './fields'
import { useState } from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import axios from 'axios'

function Cadastro() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [openMessage, setOpenMessage] = useState(false)
  const [sucess, setSucess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>()

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    await addUser(data)
    //navigate('/login')
  }

  const addUser = async (params: addUserParams) => {
    try {
      const res = await api.post(`/user/add`, {
        ...params,
        birthDate: format(params.birthDate, 'yyyy-MM-dd'), //arrumar data
      })
      setMessage(res.data.message)
      setOpenMessage(true)
      setSucess(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data.message)
        setOpenMessage(true)
      } else {
        console.error('Erro inesperado:', error)
      }
    }
  }

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Card variant="outlined" sx={{ py: '2rem' }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Cadastro
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <Input
            {...register('name', validations.name)}
            label="Nome"
            error={errors.name?.message}
          />
          <Input
            {...register('username', validations.username)}
            label="Nome de usuário"
            error={errors.username?.message}
          />
          <Input
            {...register('email', validations.email)}
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
          />
          <Input
            {...register('birthDate', validations.birthDate)}
            label="Data de Nascimento"
            type="date"
            error={errors.birthDate?.message}
          />
          <Input
            {...register('password', validations.password)}
            label="Senha"
            type="password"
            error={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained">
            Inscrever-se
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Já tem uma conta?
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Link to="/login">Entrar</Link>
          </Typography>
        </Box>
      </Card>
      {openMessage ? (
        <ErrorMessage
          message={message}
          openMessage={openMessage}
          setOpenMessage={setOpenMessage}
          sucess={sucess}
        />
      ) : (
        <div></div>
      )}
    </Stack>
  )
}

export default Cadastro
