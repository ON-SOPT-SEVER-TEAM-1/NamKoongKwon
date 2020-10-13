const getIndex = {
  index: (members) => {
    const OBidx = [];
    const YBidx = [];
    let index = 0;
    members.map((member) => {
      if (member.status === "OB") {
        OBidx.push(index++);
      } else {
        YBidx.push(index++);
      }
    });
    return [OBidx, YBidx];
  },
};

module.exports = getIndex.index;