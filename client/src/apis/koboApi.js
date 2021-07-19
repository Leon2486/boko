import axios from "axios";

export default axios.create({
  baseURL: "https://app.rakuten.co.jp/services/api/Kobo",
  params: {
    applicationId: "1003450537929584355",
  },
});
