import axios from "axios";

const URL = `https://yalantis-react-school-api.yalantis.com/api/task0/users`;
export const getEmployees = () => axios.get(URL);
