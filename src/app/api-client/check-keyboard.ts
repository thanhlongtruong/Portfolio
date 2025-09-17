import axios from "axios";

export const checkKeyboard = async (key: string) => {
  return await axios.post(
    "/api/keyboard",
    { key: key },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
