import axios from "axios";

export const loginUser = async (data: any) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    data
  );

  return response.data;
};