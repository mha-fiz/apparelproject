export const getTranslatedTitle = (title, callback) => {
  if (title.toLowerCase() === "hats") return callback("hats");
  if (title.toLowerCase() === "mens") return callback("mens");
  if (title.toLowerCase() === "womens") return callback("womens");
  if (title.toLowerCase() === "sneakers") return callback("sneakers");
  if (title.toLowerCase() === "jackets") return callback("jackets");
};
