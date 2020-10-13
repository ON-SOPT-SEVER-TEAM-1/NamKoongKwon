const groupMixer = {
  mix: (memberArray) => {
    if (memberArray instanceof Array) {
      const mixedObj = memberArray.sort(function () { return 0.5 - Math.random(); });
      const mixedArray = [];
      mixedObj.filter(index => {
        mixedArray.push(index);
      })
      return mixedArray;
    }
  },
};

module.exports = groupMixer;