import React from "react";
import * as apis from "@/apis";
import { toast } from "react-toastify";
import { getCurrent } from "@/store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";

const Information = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [firstName, setFirstName] = React.useState(current?.firstName);
  const [lastName, setLastName] = React.useState(current?.lastName);
  const handleSaveInfo = async () => {
    const response = await apis.apiUpdateInfo({
      firstName,
      lastName,
    });

    if (response.err === 0) {
      toast.success("Update information successfully");
      dispatch(getCurrent());
    } else {
      toast.error("Update information failed");
    }
  };
  return (
    <div className="flex-1 w-full bg-white p-5 rounded-lg">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button
          className="bg-green-100 p-2 rounded-md cursor-pointer text-sm border border-green-400 inline-block"
          onClick={() => handleSaveInfo()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Information;
