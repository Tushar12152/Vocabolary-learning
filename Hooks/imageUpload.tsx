import axios from "axios"

export const imageUpload = async (image:any) => {
    const formData = new FormData()
    formData.append('image', image)
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=400a20a4420cbd865f5a97bb6cd5db43`,
      formData
    )
    return data
  }