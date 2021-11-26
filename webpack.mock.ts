import User from "@/shared/types/user";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import Profile from "@/shared/types/profile";
import ProductItem from "@/shared/types/productItem";
import Genres from "@/mockData/genres.json";
import Ages from "@/mockData/ages.json";
import Categories from "@/mockData/categories.json";
import Criterias from "@/mockData/criterias.json";
import SortTypes from "@/mockData/sortTypes.json";
import JsonUsers from "./src/mockData/users.json";
import JsonGames from "./src/mockData/games.json";

export default webpackMockServer.add((app) => {
  // Product part
  app.get("/api/search", (req, res) => {
    const responce = JsonGames.filter((game) =>
      game.name.toLowerCase().includes((req.query.text as string).toLowerCase())
    );
    res.json(responce);
  });

  app.get("/api/getTopProducts", (_req, res) => {
    JsonGames.sort((a, b) => new Date(b.dateCreated).valueOf() - new Date(a.dateCreated).valueOf());
    res.json(JsonGames.slice(0, 3));
  });

  app.get("/api/products", (req, res) => {
    function sortFunction(a: ProductItem, b: ProductItem) {
      let result = 0;
      switch (Criterias.filter((c) => c.name === req.query.sortType)[0].id) {
        case 1: {
          result = a.totalRating - b.totalRating;
          break;
        }
        case 2: {
          result = a.price - b.price;
          break;
        }
        default: {
          result = 0;
          break;
        }
      }
      return SortTypes.filter((t) => t.name === req.query.sortDir)[0].id === 1 ? result : -result;
    }

    function isInFilterGenre(element: ProductItem): boolean {
      if (req.query.genre === "") {
        return true;
      }

      if (element.genre === Genres.filter((g) => g.name === req.query.genre)[0].id) {
        return true;
      }

      return false;
    }

    function isInFilterAge(element: ProductItem): boolean {
      if (req.query.age === "") {
        return true;
      }

      if (element.age === Ages.filter((a) => a.name === req.query.age)[0].id) {
        return true;
      }

      return false;
    }

    function isInFilterCategory(element: ProductItem): boolean {
      if (req.query.category === "") {
        return true;
      }

      if (element.platform.includes(Categories.filter((c) => c.name === req.query.category)[0].id)) {
        return true;
      }

      return false;
    }

    function isFitsSearchName(element: ProductItem): boolean {
      if (req.query.searchName === "") {
        return true;
      }

      if (element.name.toLowerCase().includes((req.query.searchName as string).toLowerCase())) {
        return true;
      }

      return false;
    }

    const response = JsonGames.filter(
      (game) => isFitsSearchName(game) && isInFilterGenre(game) && isInFilterAge(game) && isInFilterCategory(game)
    ).sort((a, b) => sortFunction(a, b));
    setTimeout(() => res.json(response), 1000);
  });

  // Auth part
  app.post("/api/auth/signIn", (req, res) => {
    const signInUser = JsonUsers.filter(
      (user) => user.name === req.body.userName && user.password === req.body.password
    )[0];
    if (signInUser !== undefined) {
      const user: User = { id: signInUser.id, name: signInUser.name };
      res.status(StatusCodes.OK).json(user);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.put("/api/auth/signUp", (req, res) => {
    if (JsonUsers.filter((user) => user.name === req.body.userName).length === 1) {
      console.log("User already exists.");
      res.status(StatusCodes.BAD_REQUEST).json();
    } else {
      const newUser = {
        id: JsonUsers[JsonUsers.length - 1].id + 1,
        name: req.body.userName,
        email: "test@gmail.com",
        password: req.body.password,
        defaultDeliveryAddress: {
          country: "",
          city: "",
          street: "",
          houseNumber: 0,
          houseBuilding: "",
          entranceNumber: 0,
          floorNumber: 0,
          flatNumber: 0,
        },
        image: "",
        description: "",
        phoneNumber: "",
        balance: 0,
      };
      JsonUsers.push(newUser);
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("New user added.");
      });
      const user: User = { id: newUser.id, name: newUser.name };
      res.status(StatusCodes.CREATED).json(user);
    }
  });

  // Profile part
  app.get("/api/getProfile", (req, res) => {
    const findedUser = JsonUsers.filter((user) => user.id === Number(req.query.id))[0];
    if (findedUser !== undefined) {
      const profile: Profile = {
        id: findedUser.id,
        name: findedUser.name,
        email: findedUser.email,
        defaultDeliveryAddress: (findedUser as unknown as Profile).defaultDeliveryAddress,
        image: (findedUser as unknown as Profile).image,
        description: (findedUser as unknown as Profile).description,
        phoneNumber: (findedUser as unknown as Profile).phoneNumber,
      };
      res.status(StatusCodes.OK).json(profile);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/saveProfile", (req, res) => {
    const findedUser = JsonUsers.filter((user) => user.id === req.body.updatedUser.id)[0];
    if (findedUser !== undefined) {
      const profile = {
        id: findedUser.id,
        name: req.body.updatedUser.name,
        email: req.body.updatedUser.email,
        password: findedUser.password,
        defaultDeliveryAddress: (findedUser as unknown as Profile).defaultDeliveryAddress,
        image: req.body.updatedUser.image,
        description: req.body.updatedUser.description,
        phoneNumber: req.body.updatedUser.phoneNumber,
        balance: findedUser.balance,
      };
      JsonUsers[req.body.updatedUser.id - 1] = profile;
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("User information updated.");
      });
      res.status(StatusCodes.OK).json(profile);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/changePassword", (req, res) => {
    const findedUser = JsonUsers.filter((user) => user.id === req.body.id)[0];
    if (findedUser !== undefined) {
      findedUser.password = req.body.newPassword;
      JsonUsers[req.body.id - 1] = findedUser;
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("User password changed.");
      });
      res.status(StatusCodes.OK).json();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/changeDefaultDeliveryAddress", (req, res) => {
    const findedUser = JsonUsers.filter((user) => user.id === req.body.id)[0];
    if (findedUser !== undefined) {
      (findedUser as unknown as Profile).defaultDeliveryAddress = req.body.address;
      JsonUsers[req.body.id - 1] = findedUser;
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("User default delivery address changed.");
      });
      res.status(StatusCodes.OK).json();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });
});
