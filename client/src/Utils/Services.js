export const baseUrl = "http://localhost:3000/api" 
// "https://chat-app-production-2.up.railway.app/api"
// "http://localhost:3000/api" 


// ========================================================================POST Request ==================================================================================
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
// ========================================================================##POST Request ==================================================================================
// ========================================================================GET Request ==================================================================================
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
// ========================================================================##GET Request ==================================================================================
// ========================================================================Protected POST Request ==================================================================================

// ========================================================================##Protected POST Request ==================================================================================
// ========================================================================Protected GET Request ==================================================================================
export const ProtectedGetRequest = async (url , token) => {
  const response = await fetch(url , {
    method: 'GET',
    headers: {
        'Authorization': `${token}`
    }
})
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
// ========================================================================##Protected GET Request ==================================================================================
