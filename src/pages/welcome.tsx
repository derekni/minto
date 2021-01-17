import Head from "next/head";

const welcome = () => {
  return (
    <>
      <Head>
        <title>Welcome to Minto</title>
      </Head>
      <div className="bg-gray-50 min-h-screen flex justify-center items-center flex-col">
        <img src="img/mint-128x128.png" className="w-12 mb-4" />
        <div className="font-bold text-4xl mb-6">Welcome to Minto</div>
        <div className="text-base text-center">
          Minto is a rewards based productivity system.
        </div>
        <div className="text-base text-center mb-4">
          Earn a mint for every minute you work → Spend mints on rewards you
          create
        </div>
        <div className="text-base mb-6 text-center">
          Get started by customizing your settings.
        </div>
        <button
          className="bg-green-500 text-base text-white font-semibold py-1 px-8 shadow hover:shadow-lg transition-all duration-200 rounded"
          onClick={() => {
            chrome.runtime.openOptionsPage();
            window.close();
          }}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default welcome;
