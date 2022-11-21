export const getTranslatedTitle = (title, callback) => {
  if (title === "hats") return callback("hats");
  if (title === "mens") return callback("mens");
  if (title === "womens") return callback("womens");
  if (title === "sneakers") return callback("sneakers");
  if (title === "jackets") return callback("jackets");
};
