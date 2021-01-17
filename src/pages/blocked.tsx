import Head from "next/head";

const blocked = () => {
  return (
    <>
      <Head>
        <title>Blocked</title>
      </Head>
      <div className="bg-gray-50 min-h-screen flex justify-center items-center flex-col">
        <div className="font-bold text-6xl mb-10">Get back to work!</div>
        <button
          className="bg-red-500 text-xl text-white font-semibold p-3 shadow hover:shadow-lg transition-all duration-200 rounded"
          onClick={() => {
            history.go(-2);
          }}
        >
          Go back
        </button>
      </div>
    </>
  );
};

export default blocked;
