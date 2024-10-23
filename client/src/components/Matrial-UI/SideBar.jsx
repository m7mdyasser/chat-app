import { Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useRef, useState } from 'react';


const SideBar = ({ children }) => {
  const [top, setTop] = useState(`0`)
  const [height, setHeight] = useState('0')
  const [focus, setFocus] = useState(false)
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollBarStartY, setScrollBarStartY] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrollBarRef = useRef(null);
  const Search = useRef(null)
  const theme = useTheme();

  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current;
    const scrollBar = scrollBarRef?.current;
    setTimeout(() => {
      scrollContainer?.scrollHeight / scrollContainer?.clientHeight <= 1 ? null : setHeight((scrollContainer?.clientHeight / scrollContainer?.scrollHeight) * 100 + '%');
    }, 400);
    const handleScroll = () => {
      const scrollPosition = scrollContainer.scrollTop;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      
      setTop(scrollPosition + scrollPercentage * (scrollContainer.clientHeight - scrollBar.offsetHeight) + 'px')
      setHeight((scrollContainer?.clientHeight / scrollContainer?.scrollHeight) * 100 + '%');
    };
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartY(e.clientY);
      setScrollBarStartY(Math.min(scrollBar.offsetTop, scrollContainer.clientHeight - scrollBar.offsetHeight));
      document.body.style.pointerEvents = 'none';
      scrollBar.style.pointerEvents = 'auto';
    };
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      const maxScrollBarTop = scrollContainer.clientHeight - scrollBar.offsetHeight;
      const newScrollBarTop = scrollBarStartY + deltaY;
      if (newScrollBarTop >= maxScrollBarTop) {
        const scrollPercentage = maxScrollBarTop / maxScrollBarTop;
        scrollContainer.scrollTop = scrollPercentage * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
      }
      if (newScrollBarTop <= 0) {
        const scrollPercentage = 0 / maxScrollBarTop;
        scrollContainer.scrollTop = scrollPercentage * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
      }
      if (newScrollBarTop >= 0 && newScrollBarTop <= maxScrollBarTop) {
        const scrollPercentage = newScrollBarTop / maxScrollBarTop;
        scrollContainer.scrollTop = scrollPercentage * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.pointerEvents = 'auto';
    };
    scrollBar.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollBar.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isDragging, startY, scrollBarStartY]);

  return (
    <Box className='no-select' sx={{ height: "100%", backgroundColor: "transparent",borderWidth:" 0 1px 0 0", borderColor:"rgba(231,231,231,255)", borderStyle:"solid" }}>
      <Box sx={{
        width: '500px',
        height: '60px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between ',
        alignItems: 'center',
        gap: "20px",
        padding: '0 10px'
      }}>
        <IconButton >
          <MenuIcon sx={{ fontSize: '30px' }} />
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
            <CloseIcon sx={{ fontSize: '20px' }} />
          </IconButton>
          <input
            onFocus={() => { setFocus(true) }}
            onBlur={() => { setFocus(false); Search.current.value != '' ? Search.current.focus() : null }}
            placeholder='search'
            ref={Search}
            style={{
              width: '100%',
              height: '38px',
              backgroundColor: focus ? "rgba(241,241,241, 0)" : "rgba(241,241,241,1)",
              color: "rgb(110, 127, 128)",
              borderRadius: "20px",
              border: '2px solid rgb(241,241,241)',
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
          }
        `}
          </style>
        </Box>
      </Box>
      <Box className="scroll-container"
      ref={scrollContainerRef}
      sx={{ backgroundColor: "transparent",
      display: "flex",
      flexDirection: "column",
      height: "calc(100% - 60px)",
      position: "relative",
      }}>
        <div className="scroll-bar" 
        ref={scrollBarRef}
        style={{ position: 'absolute',
        right: "4px",
        top: top,
        width: '4px',
        height: height,
        borderRadius: "10px",
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        }}></div>
        {children}
      </Box>
    </Box>
  )
}

export default SideBar