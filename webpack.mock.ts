import fs from "fs";
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import JsonGames from "./src/mockData/games.json";
import JsonUsers from "./src/mockData/users.json";

export default webpackMockServer.add((app, helper) => {
  app.get("/testMock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });

  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });

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

  app.post("/api/auth/signIn", (req, res) => {
    if (
      JsonUsers.filter((user) => user.name.trim() === req.body.userName && user.password.trim() === req.body.password)
        .length > 0
    ) {
      res.statusCode = 201;
      res.json(
        JsonUsers.filter((user) => user.name.trim() === req.body.userName && user.password.trim() === req.body.password)
      );
    } else {
      res.statusCode = 400;
    }
  });

  app.put("/api/auth/signUp", (req, res) => {
    if (JsonUsers.filter((user) => user.name.trim() === req.body.userName).length > 0) {
      res.statusCode = 400;
      console.log("User already exists.");
    } else {
      const newUser = {
        id: JsonUsers.length + 1,
        name: req.body.userName,
        email: "test@gmail.com",
        password: req.body.password,
      };
      JsonUsers.push(newUser);
      fs.writeFile("./src/mockData/users.json", JSON.stringify(JsonUsers, null, "\t"), (err) => {
        if (err) throw err;
        console.log("New user added.");
      });
      res.statusCode = 200;
      res.json(newUser);
    }
  });
});
