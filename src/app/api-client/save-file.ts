import axios from "axios";

interface typeSaveFile {
  url: string;
  name: string;
}
export const saveFile = async (data: typeSaveFile) => {
  return await axios.post("/api/save-file", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getFile = async () => {
  return await axios.get("/api/save-file");
};
