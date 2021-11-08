// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import JsonGames from "./src/mockData/games.json";

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
});
