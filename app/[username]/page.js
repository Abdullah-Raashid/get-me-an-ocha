import React from "react";

const Username = ({ params }) => {
  return (
    <>
      <div className="cover bg-red-5 relative">
        <img
          className="object-cover w-full h-[550px]"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/7626434/0633a064b31d4da1b37366955464574c/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/9.png?token-time=1733270400&token-hash=rkbY48UiHO7IepjydCyKiSUk67o5i9j69_paLOGUCMk%3D"
          alt=""
        />
        <div className="absolute -bottom-20 right-[45%] border-white border-2 rounded-full">
          <img
            className="rounded-full"
            width={164}
            height={164}
            src="https://cdn2.steamgriddb.com/icon/feecee9f1643651799ede2740927317a/32/256x256.png"
            alt=""
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 flex-col gap-2">
        <div className="font-bold text-lg">@{params.username}</div>
        <div className="text-slate-400">
          creating UNFILTERED Podcasts, Bonus Episodes, Vlogs, and Shows
        </div>
        <div className="text-slate-400">
          9719 members, 538 posts, $15,450/release
        </div>
        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 text-white rounded-lg p-10">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-5 text-lg">
              <li className="my-2 flex gap-2 items-center">
                <img width={33} p-2 src="avatar.svg" alt="user avatar" />
                <span>
                  Hikari donated <span className="font-bold">$30</span> with a
                  message. "Keep up the good work."
                </span>
              </li>
              <li className="my-2 flex gap-2 items-center">
                <img width={33} p-2 src="avatar.svg" alt="user avatar" />
                <span>
                  Hikari donated <span className="font-bold">$30</span> with a
                  message. "Keep up the good work."
                </span>
              </li>
              <li className="my-2 flex gap-2 items-center">
                <img width={33} p-2 src="avatar.svg" alt="user avatar" />
                <span>
                  Hikari donated <span className="font-bold">$30</span> with a
                  message. "Keep up the good work."
                </span>
              </li>
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 text-white rounded-lg p-10">
            <h2 className="text-2xl font-bold my-5">Make a payment</h2>
            <div className="flex-col flex gap-2">
              {/* Input for name and message */}
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
              <button
                type="button"
                class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Pay
              </button>
            </div>
            <div className="flex gap-2 mt-5">
              <button className="bg-slate-800 p-3 rounded-lg">pay $10</button>
              <button className="bg-slate-800 p-3 rounded-lg">pay $20</button>
              <button className="bg-slate-800 p-3 rounded-lg">pay $30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
