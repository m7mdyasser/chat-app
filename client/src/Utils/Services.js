export const baseUrl = "https://chat-app-production-2.up.railway.app/api"

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
  })
  const data = await response.json()
  if (!response.ok) {
    let message;
    // يوجد خطا هنا الحل بعد الانتهاء 
    if (data?.message) {
      console.log(2);
      message = data.message;
    } else {
      message = data
    }
    return { error: true, message }
  }
  return data
}

export const getRequest = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  if (!response.ok) {
    let message = "An Error...";
    if (data?.message) {
      message = data.message
    }
    return { error: true, message }
  }
  return data
};