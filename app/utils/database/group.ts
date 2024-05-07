export const getGroupById = async (id: number) => {
  let res = await fetch(
    `/api/group/findUnique/${encodeURIComponent(id ?? "")}`,
    {
      method: "GET",
    }
  );
  const groupData = await res.json();
  if (groupData.success && groupData.data) {
    return groupData.data;
  } else {
    return null;
  }
};

export const getGroupsByUserId = async (id: number) => {
  let res = await fetch(`/api/group/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (data.success && data.data) {
    return data.data;
  } else {
    return null;
  }
};
