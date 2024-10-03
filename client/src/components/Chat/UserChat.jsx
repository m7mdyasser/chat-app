import { useFetchRecipientUser } from "../../Hooks/useFetchRecipient"
import { Stack, } from "react-bootstrap";
import avatar from '../../assets/undraw_female_avatar_efig.svg'


function UserChat({chat , user}) {
const {recipientUser} = useFetchRecipientUser(chat , user)
  return (
    <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button" onClick={() => {}}>
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">message</div>
        </div>
      </div>
      <div className="d-flex  flex-column  align-items-end" >
        <div className="date">
        12/12/12
          {/* {moment(latestMessage?.createdAt).calendar()} */}
        </div>
        {/* <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
          {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}
        </div> */}
        {/* <span className={isOnline ? "user-online" : ""}></span> */}
      </div>

    </Stack>
  )
}

export default UserChat