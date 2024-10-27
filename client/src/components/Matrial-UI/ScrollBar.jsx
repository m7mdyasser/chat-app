import { useEffect, useRef, useState } from "react";


const ScrollBar = (container) => {
  const [top, setTop] = useState(`0`)
  const [height, setHeight] = useState('0')
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollBarStartY, setScrollBarStartY] = useState(0);
  const scrollBarRef = useRef(null);
  const scrollContainer = container.container;

  useEffect(() => {
    scrollContainer.className = `${container.container.className} scroll-container `
  }, [])

  useEffect(() => {
    const scrollBar = scrollBarRef?.current;
    scrollContainer.style.overflowY = "scroll"
    scrollContainer.style.position = "relative"

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

    <div className="scroll-bar"
      ref={scrollBarRef}
      style={{
        position: 'absolute',
        right: "4px",
        top: top,
        width: '4px',
        height: height,
        borderRadius: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}>
      <style>{`.scroll-container::-webkit-scrollbar {display: none;}`}</style>
    </div>
  )
}

export default ScrollBar;