import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutIcon from '@mui/icons-material/Logout'

const mainListItems = [
  { text: 'Pagina Inicial', icon: <HomeRoundedIcon /> },
  { text: 'Meu Perfil', icon: <PeopleRoundedIcon /> },
  { text: 'Configurações', icon: <SettingsRoundedIcon /> },
  { text: 'Sair', icon: <LogoutIcon /> },
]

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
