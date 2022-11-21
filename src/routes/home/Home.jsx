import { CategoriesContainer, Hero } from "../../components";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "womens",
      imageUrl:
        "https://www.linkpicture.com/q/pexels-marcelo-chagas-1876279.jpg",
    },
    {
      id: 5,
      title: "mens",
      imageUrl:
        "https://media.gq.com/photos/5a04d33bcaa2637175aa5d70/16:9/pass/hub-streetwear.png",
    },
  ];

  return (
    <>
      <Hero />
      <CategoriesContainer categories={categories} />
    </>
  );
};

export default Home;
