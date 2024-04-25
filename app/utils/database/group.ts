const getGroupById = async (id: number) => {
  let res = await fetch(`/api/group/id?id=${encodeURIComponent(id ?? "")}`, {
    method: "GET",
  });
  const groupData = await res.json();
  if (groupData.success && groupData.data) {
    return groupData.data;
  } else {
    return null;
  }
};
