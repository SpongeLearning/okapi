import config from "config";

import app from "./app";

const port = process.env.PORT || config.get<number>("port");

app.listen(port, () => {
  console.log(`[Info] Listening on port ${port}`);
});
