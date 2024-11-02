import { useEffect, useRef, useState } from "react";

// شروط تفعيل شريط التمرير المخصص
// 1- توفير عنصر اب به محتوى ارتفاعه اكثر من ارتفاع العنصر الاب 
// 2- توفير عنصر اب لهذا العنصر الاب يمكن تسميته العنصر الاكبر 
// 3- props توفير ثلاثه من ال
// mode واحدة تعبر عن الوضع المظلم اسمها 
// start والاخرى تعبر عن اكتمال تحميل الصفحه واسمها 
// scroll والثالثه تعبر عن اتجاه ال
// flex-direction: column-reverse ويتم استخدام الثالثه فى حلات استخدام 
const ScrollBar = ({ mode, start, dir , breakpoint}) => {
  const colorMode = mode || "light";
  const direction = dir || "normal";
  const point = breakpoint || 1 ;
  const loadingDone = start === false ? false : true;
  const [display, setDisplay] = useState("none")
  const [top, setTop] = useState(`0`)
  const [bottom, setBottom] = useState(`0`)
  const [height, setHeight] = useState('0')
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [ displaypar , setDisplaypar] = useState(true)
  const [scrollBarStartY, setScrollBarStartY] = useState(0);
  const scrollBarRef = useRef(null);
  const scrollContainerRef = useRef(null);

console.log(point);
console.log(pageWidth);

  useEffect(() => {
    if(pageWidth <= point ){
    setDisplaypar(false)
    }else {
      setDisplaypar(true)
    }
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pageWidth])

  useEffect(() => {
    if (scrollContainerRef.current) {
      const parentElement = scrollContainerRef.current.parentNode;
      const grandParentElement = scrollContainerRef.current.parentNode.parentNode;
      const scrollBar = scrollBarRef?.current;
      const scrollContainer = scrollContainerRef.current
      grandParentElement.style.position = "relative"
      parentElement.style.overflowY = "scroll"
      parentElement.className = `${parentElement.className} scroll-container `
      if (loadingDone) {
        parentElement.scrollHeight / parentElement?.clientHeight <= 1 ? null : (setHeight((parentElement?.clientHeight / parentElement?.scrollHeight) * 100 + '%'), setDisplay("Block"));
        if (direction === "normal") {
          const firstScrollPosition = parentElement.scrollTop;
          const scrollHeight = scrollContainer.scrollHeight
          setTop(scrollHeight * firstScrollPosition / parentElement.scrollHeight + 'px')

          const handleScroll = () => {
            const scrollTop = parentElement.scrollTop;
            setHeight((parentElement?.clientHeight / parentElement?.scrollHeight) * 100 + '%');
            setTop(scrollHeight * scrollTop / parentElement.scrollHeight + 'px')
          };

          const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartY(e.clientY);
            setScrollBarStartY(scrollBar.offsetTop);
            document.body.style.pointerEvents = 'none';
            scrollBar.style.pointerEvents = 'auto';
          };

          const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
            const maxScrollBarTop = scrollContainer.clientHeight - scrollBar.offsetHeight;
            const newScrollBarTop = scrollBarStartY + deltaY;
            if (newScrollBarTop >= maxScrollBarTop) {
              parentElement.scrollTop = (maxScrollBarTop * parentElement.scrollHeight / scrollHeight)
            }
            if (newScrollBarTop <= 0) {
              parentElement.scrollTop = (0 * parentElement.scrollHeight / scrollHeight)
            }
            if (newScrollBarTop >= 0 && newScrollBarTop <= maxScrollBarTop) {
              parentElement.scrollTop = (newScrollBarTop * parentElement.scrollHeight / scrollHeight)
            }
          };

          const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.pointerEvents = 'auto';
          };

          parentElement.addEventListener('scroll', handleScroll);
          scrollBar.addEventListener('mousedown', handleMouseDown);
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
          return () => {
            parentElement.removeEventListener('scroll', handleScroll);
            scrollBar.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          }
        } else if (direction === "reverse") {
          const firstScrollPosition = -parentElement.scrollTop;
          const scrollHeight = scrollContainer.scrollHeight
          setBottom(scrollHeight * firstScrollPosition / parentElement.scrollHeight + 'px')
          const handleScroll = () => {
            const scrollTop = -parentElement.scrollTop;
            setHeight((parentElement?.clientHeight / parentElement?.scrollHeight) * 100 + '%');
            setBottom(scrollHeight * scrollTop / parentElement.scrollHeight + 'px')
          };

          const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartY(e.clientY);
            setScrollBarStartY(scrollBar.offsetParent.clientHeight - scrollBar.offsetTop - scrollBar.offsetHeight);
            document.body.style.pointerEvents = 'none';
            document.body.style.userSelect = 'none';
            scrollBar.style.pointerEvents = 'auto';
          };

          const handleMouseMove = (e) => {
            if (!isDragging) return;
            const deltaY = e.clientY - startY;
            const maxScrollBarBottom = scrollContainer.clientHeight - scrollBar.offsetHeight;
            const newScrollBarBottom = scrollBarStartY - deltaY;
            if (newScrollBarBottom >= maxScrollBarBottom) {
              parentElement.scrollTop = -(maxScrollBarBottom * parentElement.scrollHeight / scrollHeight)
            }
            if (newScrollBarBottom <= 0) {
              parentElement.scrollTop = -(0 * parentElement.scrollHeight / scrollHeight)
            }
            if (newScrollBarBottom >= 0 && newScrollBarBottom <= maxScrollBarBottom) {
              parentElement.scrollTop = -(newScrollBarBottom * parentElement.scrollHeight / scrollHeight)
            }
          };

          const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.pointerEvents = 'auto';
            document.body.style.userSelect = 'auto';
          };

          parentElement.addEventListener('scroll', handleScroll);
          scrollBar.addEventListener('mousedown', handleMouseDown);
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
          return () => {
            parentElement.removeEventListener('scroll', handleScroll);
            scrollBar.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          }
        }
      }
    }
  }, [loadingDone, isDragging, startY, scrollBarStartY,]);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        display:displaypar ? display  : "none"  ,
        height: "calc(100% - 4px)",
        width: "5px",
        top: "2px",
        right: "4px",
        borderRadius: "10px",
        backgroundColor: colorMode === "light" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
        zIndex: '10',
        position: "absolute",
      }}>
      <div className="scroll-bar"
        ref={scrollBarRef}
        style={{
          height: height,
          bottom: direction === "reverse" ? bottom : null,
          top: direction === "normal" ? top : null,
          position: 'absolute',
          width: "5px",
          borderRadius: "10px",
          backgroundColor: colorMode === "light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
        }}>
      </div>
      {/* كود style فى حالة استخدام هذا الكمبوننت فى مشروع اخر  */}
      <style>{`.scroll-container::-webkit-scrollbar {display: none;}`}</style>
    </div>
  )
}

export default ScrollBar;