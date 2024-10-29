import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center gap-4 flex-col text-white h-[44vh]">
        <div className="font-bold flex gap-2 text-5xl justify-center items-center">
          Buy me an Ocha
          <span>
            <img src="\tea.gif" width={50} alt="" />
          </span>
        </div>
        <p>A crowdfunding platform for game developers. Start Now!</p>
        <div>
          <button
            type="button"
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Start Here!
          </button>
          <button
            type="button"
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Read More!
          </button>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-32">
        <h1 className="text-3xl font-bold text-center pt-14 my-16">
          People can buy you an Ocha
        </h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img
              className="bg-slate-400
              rounded-full
              p-1
              text-black"
              width={88}
              src="\work.gif"
              alt=""
            />
            <p className="font-bold">Fund Yourself!</p>
            <p className="text-center">People are available to help you!</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img
              className="bg-slate-400
              rounded-full
              p-1
              text-black"
              width={88}
              src="\coin.gif"
              alt=""
            />
            <p className="font-bold">Fund Yourself!</p>
            <p className="text-center">People are available to help you!</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center ">
            <img
              className="bg-slate-400
              rounded-full
              p-1
              text-black"
              width={88}
              src="\group.gif"
              alt=""
            />
            <p className="font-bold">People want to help!</p>
            <p className="text-center">People are available to help you!</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pt-14 py-32 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center my-16">Embedding Test</h1>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-MEo1tGalr0?si=R-5n1BQ4_KVRhVt_"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
