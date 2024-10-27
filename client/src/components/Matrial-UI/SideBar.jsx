import { Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useRef, useState } from 'react';
import ScrollBar from './ScrollBar';
import { ChatContext } from '../../Context/ChatContext';


const SideBar = ({ children }) => {
  const { searchBarFocus, searchBarBlur, setSearchInputValue ,currentChat ,setOpenDrawer } = useContext(ChatContext)
  const [focus, setFocus] = useState(false)
  const [inputValue , setInputValue ] = useState("")
  const scrollContainerRef = useRef(null);
  const Search = useRef(null)
  const theme = useTheme();

  useEffect(() => {
    setSearchInputValue(inputValue)
  }, [inputValue])

useEffect(()=>{
  searchBarBlur(setFocus, Search.current)
  Search.current.value = ""
},[currentChat])

  return (
    <Box className='no-select'
    sx={{
      height: "100%",
      minWidth: "500px",
      backgroundColor: "transparent",
      borderWidth: " 0 1px 0 0",
      borderColor: theme.palette.primary.border,
      borderStyle: "solid"
    }}>
      <Box sx={{
        width: '500px',
        height: '60px',
        backgroundColor: theme.palette.primary.background2,
        display: 'flex',
        justifyContent: 'space-between ',
        alignItems: 'center',
        gap: "20px",
        padding: '0 10px'
      }}>
        <IconButton onClick={()=>{setOpenDrawer(true) }} >
          <MenuIcon sx={{ fontSize: '30px' ,color:theme.palette.primary.text ,'&:hover': {color:theme.palette.secondary.textHover }}} />
        </IconButton>
        <Box style={{ position: 'relative', width: '100%' }}>
          <IconButton
            onClick={() => { Search.current.value = ''; Search.current.blur() }}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              transform: 'translateY(-50%)',
              display: focus ? 'flex' : "none"
            }}>
            <CloseIcon sx={{ fontSize: '20px', color:theme.palette.primary.text ,'&:hover': {color:theme.palette.secondary.textHover } }} />
          </IconButton>
          <input
            onFocus={() => { searchBarFocus(setFocus) }}
            onBlur={() => { searchBarBlur(setFocus, Search.current) }}
            onChange={(e) => {setInputValue(e.target.value)}}
            placeholder='search'
            ref={Search}
            style={{
              width: '100%',
              height: '38px',
              backgroundColor: focus ? theme.palette.secondary.focusSearchBG : theme.palette.primary.searchBG,
              color:theme.palette.primary.whiteText ,
              borderRadius: "20px",
              border: '2px solid ',
              borderColor:theme.palette.primary.searchBG,
              outline: 'none',
              padding: '8px 5px 10px 12px',
              fontSize: '16px',
              lineHeight: '1.5',
              transition: 'background-color 0.5s'
            }} />
          <style>
            {`
          input::placeholder {
            padding:0 0 0 4px ;
            line-height: 120% ;
            opacity: 0.8;
            color:${theme.palette.primary.text}
          }
        `}
          </style>
        </Box>
      </Box>
      <Box
        ref={scrollContainerRef}
        sx={{
          backgroundColor: theme.palette.primary.background2,
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 60px)",
          width: "500px"
        }}>
        {scrollContainerRef?.current && <ScrollBar container={scrollContainerRef?.current} />}
        {children}
      </Box>
    </Box>
  )
}

export default SideBar