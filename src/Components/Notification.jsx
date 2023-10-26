import React, { useState } from "react";
import data from "../../data.json";

export default function () {
  const [userData, setUserData] = useState(data);
  const markAsRead = () => {
    const clone = [...userData].map((item) => {
      item.read = true;
      return item;
    });

    setUserData(clone);
  };

  const forSingleClick = (index) => {
    const clone = [...userData];
    clone[index].read = true;
    setUserData(clone);
  };

  return (
    <div className="bg-white py-[24px] px-[16px]">
      <header className="flex justify-between items-center">
        <div className="flex gap-[9px] justify-center items-center">
          <h1 className="text-[20px] text-[#1C202B] font-extrabold">
            Notifications
          </h1>
          <h2 className="w-[32px] h-[25px] bg-[#0A327B] rounded-[6px] text-[16px] text-white font-extrabold justify-center items-center text-center">
            {userData.filter((item) => !item.read).length}
          </h2>
        </div>
        <p
          onClick={markAsRead}
          className="text-[#5E6778] text-[14px] font-medium"
        >
          Mark all as read
        </p>
      </header>

      <div className="mt-[24px] flex flex-col gap-[20px]">
        {userData.map((item, index) => {
          return (
            <div
              onClick={() => {
                forSingleClick(index);
              }}
              className={`flex gap-[19px] items-start p-[10px] ${
                item.read ? "bg-transparent" : "bg-[#F7FAFD] rounded-[8px]"
              }`}
              key={Math.random()}
            >
              <img
                src={`./assets/avatar-${item.author
                  .replace(" ", "-")
                  .toLowerCase()}.webp`}
                alt=""
                className="w-[45px]"
              />
              <div>
                <p>
                  <span className="text-[#1C202B] font-extrabold">
                    {item.author}
                  </span>{" "}
                  <span className="text-[#5E6778] font-medium">
                    {item.type}
                  </span>{" "}
                  {item.type == "sent you a private message" && (
                    <p className="text-[#939CAD] font-medium">{item.time}</p>
                  )}
                  {item.content.includes(".webp") ? (
                    <img
                      className="w-[39px] inline ml-[15px]"
                      src={item.content}
                    />
                  ) : (
                    <span
                      className={`${
                        item.type == "left the group" ||
                        item.type == "has joined your group"
                          ? "text-[#0A327B] font-extrabold"
                          : item.type == "sent you a private message"
                          ? "block border-[2px] border-[#DDE7EE] p-[16px] rounded-[5px] mt-[12px]"
                          : "text-[#5E6778] font-bold w-[263px] h-[122px] "
                      }`}
                    >
                      {item.content}
                    </span>
                  )}
                  {item.type != "sent you a private message" && (
                    <p className="text-[#939CAD] font-medium">{item.time}</p>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
