import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { Box, useTheme, Typography, Stack } from "@mui/material";
import avatar from '../../assets/vector.jpg'




const PotentialChats = () => {
  const { user } = useContext(AuthContext)
  const { createChat, onlineUsers, displayUserChats, searchedPotentialChats, } = useContext(ChatContext)
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%", width: "100%", backgroundColor: theme.palette.primary.background2, display: displayUserChats ? "none" : "flex" }}>
      <Stack direction={"row"} sx={{ alignItems: "flex-start", width: "100%", flexWrap: "wrap", height: "fit-content" }}>
        {searchedPotentialChats && searchedPotentialChats.map((u, index) => {
          return (
            <Stack gap={1} sx={{
              width: "80px", alignItems: "center", justifyContent: "center", backgroundColor: theme.palette.primary.background2, padding: "10px",
              '&:hover': {
                backgroundColor: theme.palette.secondary.background2Hover, // تغيير اللون عند التمرير
                cursor: 'pointer', // تغيير شكل المؤشر عند التمرير
              },
            }} key={index} onClick={() => createChat(user._id, u._id)}>
              <Box sx={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <img src={avatar} height="50px" style={{ borderRadius: "50%" }} />
                <span style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: onlineUsers?.some((user) => user?.userId === u?._id) ? theme.palette.primary.notification : "transparent",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: onlineUsers?.some((user) => user?.userId === u?._id) ? theme.palette.primary.background2 : "transparent",
                  position: "absolute",
                  right: "-2px",
                  bottom: "4px"
                }}></span>
                {/* onlineUsers?.some((user) => user?.userId === u?._id) ? */}
              </Box>
              <Typography sx={{ color: theme.palette.primary.main }}>
                {u.name}
              </Typography>
            </Stack>
          )
        })}
      </Stack>
    </Box>
  )
}

export default PotentialChats;