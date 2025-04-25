// src/actions/useractions.js

export const fetchuser = async (username) => {
  // mock example
  const res = await fetch(`/api/user/${username}`);
  const data = await res.json();
  return data;
};

export const updateProfile = async (e, username) => {
  e.preventDefault();
  // another mock example
  const res = await fetch(`/api/user/${username}`, {
    method: "POST",
    body: JSON.stringify({
      /* user form data here */
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
