import Products from "../product/Products";
import BrowseRange from "./components/browse-range/BrowseRange";
import Hero from "./components/hero/hero";


const Home = () => {
    return (
        <>
            <Hero />
            <BrowseRange />
            <Products />
        </>
    );
};

export default Home;