const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  await server.start();

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (req, res) => {
        const { name = "default", location = "depok", lang } = req.query;
        if (lang === "id") {
          return "Hai, mantap";
        }
        return `<h1>Hello, ${name} from ${location}</h1>`;
      },
    },
    {
      method: "*",
      path: "/",
      handler: (req, res) => {
        return "Tidak bisa mengakses dengan method tersebut";
      },
    },
    {
      method: "GET",
      path: "/about",
      handler: (req, res) => {
        return "<res1>About Page</res1>";
      },
    },
    {
      method: "*",
      path: "/about",
      handler: (req, res) => {
        return "tidak dapat mengakses dengan method tersebut";
      },
    },
    {
      method: "GET",
      path: "/userx",
      handler: (req, res) => {
        return res.response("mantap").code(201);
      },
    },
    {
      method: "GET",
      path: "/users/{username?}",
      handler: (req, res) => {
        const { username = "rangga" } = req.params;
        return `Hello ${username}`;
      },
    },

    {
      method: "*",
      path: "/{any*}",
      handler: (req, res) => {
        return "halaman tidak ditemukan";
      },
    },
  ]);

  console.log(`Server Berjalan pada ${server.info.uri}`);
};

init();
