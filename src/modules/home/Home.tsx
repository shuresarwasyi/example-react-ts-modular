import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * Home component representing the home page.
 * @returns {React.JSX.Element} The rendered home page component.
 */
const HomePage = (): React.JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Home Page | Vite Modular App</title>
      </Helmet>
      <section className="bg-white dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xxl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
          <div>
            <h2 className="text-3xl mb-4 font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Home Page
            </h2>
            <Link
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 inline-flex"
              to="/member"
              reloadDocument
            >
              Go to Member Page
            </Link>
          </div>
          <p className="mt-8 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et
            laoreet orci. Donec ipsum arcu, efficitur ac tempus ultrices,
            suscipit quis justo. Aliquam erat volutpat. Duis mattis tortor
            finibus tristique lobortis. Proin at pharetra mauris, in bibendum
            nisl. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Etiam id arcu quam. Nulla
            convallis tristique volutpat. Praesent faucibus sapien vitae nisl
            iaculis, eu tincidunt diam volutpat.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
