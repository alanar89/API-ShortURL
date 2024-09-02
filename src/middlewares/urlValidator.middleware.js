export const verifyUrl = (req, res, next) => {
  const { link } = req.body;
  //verificar envio token
  if (!link) {
    return res.status(401).json({ error: "ingrese url" });
  }
  try {
    if (!isValidHttpUrl(link)) {
      return res.status(401).json({ error: "url no valida" });
    }
    next();
  } catch (error) {
    return res.json({ error: error });
  }
};

function isValidHttpUrl(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
}
