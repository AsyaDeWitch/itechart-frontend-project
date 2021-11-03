import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

export async function getData2(page: string): Promise<void> {
  await api
    .get("https://reqres.in/api/users", {
      params: {
        page: { page },
      },
    })
    .then((responce) => {
      // handle success
      console.log(responce);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
}

export async function getData(): Promise<void> {
  await api
    .get("/testMock")
    .then((responce) => {
      // handle success
      console.log(responce);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
}

export async function searchGames(text: string): Promise<void> {
  try {
    await api.get("/api/search", {
      params: {
        text: { text },
      },
    });
  } catch (error) {
    // handle error
  }
}

export async function getTopProducts(): Promise<void> {
  try {
    await api.get("/api/getTopProducts", {
      params: {
        quantity: 3,
      },
    });
  } catch (error) {
    // handle error
  }
}
