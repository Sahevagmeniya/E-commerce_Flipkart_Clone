import { useContext } from "react";
import { myContext } from "../utility/Context";
import Loading from "./notifications/Loading";
import SingleProduct from "./SingleProduct";
import { MdSearchOff } from "react-icons/md";

const Home = () => {
  //useContext se humane context.jsx me se products ka data home me import kiya he
  const { products, search, loading } = useContext(myContext);

  // yaha searchproduct variable declare kiya he jisame hum search ki value ko match karake ek filtered array rakh sake jo search vali value se match hota ho(hum search bar use karke product search kar sakenge)
  let searchProducts = []; //isame humesha array aayega.
  !search
    ? // agar search blank hoga to sabhi product dikhegi
      (searchProducts = products)
    : (searchProducts = products.filter((elem) => {
        return elem.title.toLowerCase().includes(search.trim().toLowerCase());
      }));

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-[91vh] w-full flex flex-wrap overflow-y-auto gap-5 justify-center py-3">
      {searchProducts.length > 0 ? (
        searchProducts.map((elem) => (
          <SingleProduct key={elem.id} singleProductData={elem} />
        ))
      ) : (
        <div className="w-full m-5 h-[80vh] rounded flex flex-col justify-center items-center">
          <MdSearchOff className="text-8xl" />
          <h4 className="mt-3 text-4xl font-[Inter] font-semibold">
            Product is not found!
          </h4>
        </div>
      )}
    </div>
  );
};

export default Home;
