const home = async (req, res) => {
  try {
    res.status(200).send("Full Stack Development");
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

const register = async (req, res) => {
  try {
    res.status(200).send("registering page");
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};

module.exports = { home, register };
