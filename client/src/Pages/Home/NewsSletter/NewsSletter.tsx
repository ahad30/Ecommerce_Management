const NewsSletter = () => {
  return (
    <div className="bg-black mt-8">
      <section className="">
        <div className="p-5 md:p-12 lg:px-16 lg:py-24 ">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-semibold text-white md:text-2xl">
              Join our mailing to receive future exclusive offers
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-xl">
            <form action="#" className="sm:flex sm:gap-4">
              <div className="sm:flex-1 flex border border-[#45F806]">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full rounded bg-black p-3 text-[14px] text-gray-700 shadow-sm transition focus:border-[#45F806] outline-none"
                />
                <button
                  type="submit"
                  className="border group flex w-full items-center justify-center gap-2 rounded  px-6 py-3 text-black transition bg-[#45F806]  sm:mt-0 sm:w-auto"
                >
                  <span className="text-[16px] font-semibold">Subscribe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsSletter;
