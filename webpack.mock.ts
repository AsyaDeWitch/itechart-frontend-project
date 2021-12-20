import fs from "fs";
import { StatusCodes } from "http-status-codes";
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import User from "@/shared/types/user";
import Profile from "@/shared/types/profile";
import ProductItem from "@/shared/types/productItem";
import Genres from "@/mockData/genres.json";
import Ages from "@/mockData/ages.json";
import Categories from "@/mockData/categories.json";
import Criterias from "@/mockData/criterias.json";
import SortTypes from "@/mockData/sortTypes.json";
import JsonUsers from "@/mockData/users.json";
import JsonGames from "@/mockData/games.json";
import JsonCarts from "@/mockData/carts.json";
import CartItem from "@/shared/types/cartItem";
import Cart from "@/shared/types/cart";

export default webpackMockServer.add((app) => {
  // Product part
  app.get("/api/search", (req, res) => {
    const response = JsonGames.filter((game) =>
      game.name.toLowerCase().includes((req.query.text as string).toLowerCase())
    );
    res.json(response);
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

  app.post("/api/product", (req, res) => {
    const { newProduct } = req.body;
    newProduct.id = JsonGames[JsonGames.length - 1].id + 1;
    JsonGames.push(newProduct);
    fs.writeFile("./src/mockData/games.json", JSON.stringify(JsonGames, null, "\t"), (err) => {
      if (err) throw err;
      console.log("New game added.");
    });
    res.status(StatusCodes.CREATED).json(newProduct);
  });

  app.put("/api/product", (req, res) => {
    JsonGames[JsonGames.findIndex((game) => game.id === req.body.product.id)] = req.body.product;
    fs.writeFile("./src/mockData/games.json", JSON.stringify(JsonGames, null, "\t"), (err) => {
      if (err) throw err;
      console.log("Game was changed.");
    });
    res.status(StatusCodes.OK).json(req.body.product);
  });

  app.delete("/api/product", (req, res) => {
    JsonGames.splice(
      JsonGames.findIndex((game) => game.id === Number(req.query.id)),
      1
    );
    fs.writeFile("./src/mockData/games.json", JSON.stringify(JsonGames, null, "\t"), (err) => {
      if (err) throw err;
      console.log("Game was deleted.");
    });

    JsonCarts.forEach((cart) => {
      if (cart.items.findIndex((item) => item.productId === Number(req.query.id)) !== -1)
        cart.items.splice(
          cart.items.findIndex((item) => item.productId === Number(req.query.id)),
          1
        );
    });

    fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
      if (err) throw err;
    });

    res.status(StatusCodes.NO_CONTENT).json();
  });

  // Auth part
  app.post("/api/auth/signIn", (req, res) => {
    const signInUser = JsonUsers.filter(
      (user) => user.name === req.body.userName && user.password === req.body.password
    )[0];
    if (signInUser !== undefined) {
      const user = { id: signInUser.id, name: signInUser.name, role: signInUser.role };
      res.status(StatusCodes.OK).json(user);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.put("/api/auth/signUp", (req, res) => {
    if (JsonUsers.filter((user) => user.name === req.body.userName).length !== 0) {
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
        role: "user",
      };
      JsonUsers.push(newUser);
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("New user added.");
      });
      const user: User = { id: newUser.id, name: newUser.name, role: newUser.role };
      res.status(StatusCodes.CREATED).json(user);
    }
  });

  // Profile part
  app.get("/api/getProfile", (req, res) => {
    const foundUser = JsonUsers.filter((user) => user.id === Number(req.query.id))[0];
    if (foundUser !== undefined) {
      const profile: Profile = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        defaultDeliveryAddress: foundUser.defaultDeliveryAddress,
        image: foundUser.image,
        description: foundUser.description,
        phoneNumber: foundUser.phoneNumber,
        balance: foundUser.balance,
        role: foundUser.role,
      };
      res.status(StatusCodes.OK).json(profile);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/saveProfile", (req, res) => {
    if (
      JsonUsers.filter((user) => user.name === req.body.updatedUser.name && user.id !== req.body.updatedUser.id)
        .length !== 0
    ) {
      console.log("User with such name already exists.");
      res.status(StatusCodes.CONFLICT).json();
    } else {
      const foundUser = JsonUsers.filter((user) => user.id === req.body.updatedUser.id)[0];
      if (foundUser !== undefined) {
        const profile = {
          id: foundUser.id,
          name: req.body.updatedUser.name,
          email: req.body.updatedUser.email,
          password: foundUser.password,
          defaultDeliveryAddress: (foundUser as unknown as Profile).defaultDeliveryAddress,
          image: req.body.updatedUser.image,
          description: req.body.updatedUser.description,
          phoneNumber: req.body.updatedUser.phoneNumber,
          balance: req.body.updatedUser.balance,
          role: foundUser.role,
        };
        JsonUsers[JsonUsers.findIndex((user) => user.id === req.body.updatedUser.id)] = profile;
        fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
          if (err) throw err;
          console.log("User information updated.");
        });
        res.status(StatusCodes.OK).json(profile);
      } else {
        res.status(StatusCodes.BAD_REQUEST).json();
      }
    }
  });

  app.post("/api/changePassword", (req, res) => {
    const foundUser = JsonUsers.filter((user) => user.id === req.body.id)[0];
    if (foundUser !== undefined) {
      foundUser.password = req.body.newPassword;
      JsonUsers[JsonUsers.findIndex((user) => user.id === req.body.id)] = foundUser;
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
    const foundUser = JsonUsers.filter((user) => user.id === req.body.id)[0];
    if (foundUser !== undefined) {
      (foundUser as unknown as Profile).defaultDeliveryAddress = req.body.address;
      JsonUsers[JsonUsers.findIndex((user) => user.id === req.body.id)] = foundUser;
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("User default delivery address changed.");
      });
      res.status(StatusCodes.OK).json();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/changeDefaultDeliveryAddress", (req, res) => {
    const foundUser = JsonUsers.filter((user) => user.id === req.body.id)[0];
    if (foundUser !== undefined) {
      (foundUser as unknown as Profile).defaultDeliveryAddress = req.body.address;
      JsonUsers[JsonUsers.findIndex((user) => user.id === req.body.id)] = foundUser;
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("User default delivery address changed.");
      });
      res.status(StatusCodes.OK).json();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.get("/api/getBalance", (req, res) => {
    const foundUser = JsonUsers.filter((user) => user.id === Number(req.query.id))[0];
    if (foundUser !== undefined) {
      res.status(StatusCodes.OK).json(foundUser.balance);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  // Cart part
  app.post("/api/addProductToCart", (req, res) => {
    const foundCart = JsonCarts.filter((cart) => cart.idUser === Number(req.body.id))[0];
    const today = new Date();
    // there isn't any cart for user
    if (foundCart === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newCart: any = {
        id: JsonCarts.length === 0 ? 1 : JsonCarts[JsonCarts.length - 1].id + 1,
        idUser: Number(req.body.id),
        items: [
          {
            id: 1,
            productId: req.body.productId,
            date: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
            amount: 1,
            choosedPlatform: req.body.platform,
          },
        ],
      };
      JsonCarts.push(newCart);
      fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
        if (err) throw err;
        console.log("Product successfully added to cart");
      });
      res.status(StatusCodes.OK).json();
    } else {
      const foundItem = foundCart.items.filter(
        (item) => req.body.productId === item.productId && item.choosedPlatform === req.body.platform
      )[0];
      if (foundItem !== undefined) {
        foundItem.amount += 1;
        foundCart.items[foundCart.items.findIndex((item) => item.id === foundItem.id)] = foundItem;
        JsonCarts[JsonCarts.findIndex((cart) => cart.id === foundCart.id)] = foundCart;
        fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
          if (err) throw err;
          console.log("Product amount successfully increased.");
        });
        res.status(StatusCodes.OK).json();
      } else {
        const newCartItem = {
          id: foundCart.items.length === 0 ? 1 : foundCart.items[foundCart.items.length - 1].id + 1,
          productId: req.body.productId,
          date: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
          amount: 1,
          choosedPlatform: req.body.platform,
        };
        foundCart.items.push(newCartItem);
        JsonCarts[JsonCarts.findIndex((cart) => cart.id === foundCart.id)] = foundCart;
        fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
          if (err) throw err;
          console.log("Product successfully added to cart.");
        });
        res.status(StatusCodes.OK).json();
      }
      res.status(StatusCodes.OK).json();
    }
  });

  app.get("/api/getProductsInCart", (req, res) => {
    const foundCart = JsonCarts.filter((cart) => cart.idUser === Number(req.query.id))[0];
    if (foundCart !== undefined) {
      const returnCartItems: CartItem[] = [];
      foundCart.items.forEach((item) =>
        returnCartItems.push({
          id: item.id,
          product: JsonGames.filter((game) => game.id === item.productId)[0],
          date: item.date,
          amount: item.amount,
          choosedPlatform: item.choosedPlatform,
        })
      );
      const returnCart: Cart = {
        id: foundCart.id,
        idUser: foundCart.idUser,
        items: returnCartItems,
      };
      res.status(StatusCodes.OK).json(returnCart);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/buyProductsFromCart", (req, res) => {
    const foundCart = JsonCarts.filter((cart) => cart.idUser === Number(req.body.id))[0];
    if (foundCart !== undefined) {
      try {
        foundCart.items = foundCart.items.filter((item) => !req.body.productIds.includes(item.productId));

        JsonCarts[JsonCarts.findIndex((cart) => cart.id === foundCart.id)] = foundCart;
        fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
          if (err) throw err;
        });

        const foundUser = JsonUsers.filter((user) => user.id === Number(req.body.id))[0];
        foundUser.balance -= req.body.totalPrice;
        foundUser.balance = Math.round(foundUser.balance * 100) / 100;
        JsonUsers[JsonUsers.findIndex((user) => user.id === foundUser.id)] = foundUser;
        fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
          if (err) throw err;
        });
        console.log("Products from cart successfully bought.");
        res.status(StatusCodes.OK).json();
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json();
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.delete("/api/removeProductsFromCart", (req, res) => {
    const foundCart = JsonCarts.filter((cart) => cart.idUser === Number(req.query.id))[0];
    if (foundCart !== undefined && req.body.productIds !== undefined) {
      foundCart.items = foundCart.items.filter((item) => !req.body.productIds.includes(item.productId));
      fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
        if (err) throw err;
        console.log("Products from cart successfully removed.");
      });
      res.status(StatusCodes.NO_CONTENT).json();
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/changeProductQuantityInCart", (req, res) => {
    const foundCart = JsonCarts.filter((cart) => cart.idUser === Number(req.body.id))[0];
    if (foundCart !== undefined) {
      const foundItem = foundCart.items.filter((item) => req.body.productId === item.productId)[0];
      if (foundItem !== undefined) {
        foundItem.amount = req.body.amount;
        foundCart.items[foundCart.items.findIndex((item) => item.id === foundItem.id)] = foundItem;
        JsonCarts[JsonCarts.findIndex((cart) => cart.id === foundCart.id)] = foundCart;
        fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
          if (err) throw err;
          console.log("Product amount successfully increased.");
        });
        res.status(StatusCodes.OK).json();
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });

  app.post("/api/changeProductChoosedPlatformInCart", (req, res) => {
    const foundCart = JsonCarts.filter((cart) => cart.idUser === Number(req.body.id))[0];
    if (foundCart !== undefined) {
      const foundItem = foundCart.items.filter((item) => req.body.productId === item.productId)[0];
      if (foundItem !== undefined) {
        foundItem.choosedPlatform = req.body.platformId;
        foundCart.items[foundCart.items.findIndex((item) => item.id === foundItem.id)] = foundItem;
        JsonCarts[JsonCarts.findIndex((cart) => cart.id === foundCart.id)] = foundCart;
        fs.writeFile("./src/mockData/carts.json", JSON.stringify(JsonCarts, null, "\t"), (err) => {
          if (err) throw err;
          console.log("Product choosed platform successfully changed.");
        });
        res.status(StatusCodes.OK).json();
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json();
    }
  });
});
