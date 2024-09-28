export default function Banner() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Posts and Blogs <br></br>
          </h1>
          <h3 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Fresh Insights from Our Farmers Market
          </h3>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Explore seasonal tips, meet local farmers, and get the latest
            updates on sustainable living. Stay inspired and connected with
            fresh content for a healthier life!
          </p>
        </div>
      </section>
    </>
  );
}
