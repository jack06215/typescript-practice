import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

interface User {
  id: number;
  email: string;
  first_name: string;
}

interface GetUsersResponse {
  data: Array<User>;
}

interface CreateUserResponse {
  name: string;
  job: string;
  id: string;
  createAt: string;
}

async function getUsers() {
  return api
    .get<GetUsersResponse>("/users")
    .then((response) => {
      console.log(response.config.headers);
      console.log(`response status is: ${response.status}`);
      console.log(JSON.stringify(response.data, null, 2));
      return response;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      }
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    });
}

async function createUser() {
  return api
    .post<CreateUserResponse>("/users")
    .then((response) => {
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(`error message: ${error.message}`);
        return error.message;
      }
      console.log(`Unexpected error ${error}`);
      return "An unexcpcted error occured.";
    });
}

getUsers();
createUser();
