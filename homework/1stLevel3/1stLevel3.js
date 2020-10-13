const members = require('./member');
const groupMixer = require('./modules/groupMixer');
const groupPrint = require('./modules/groupPrint');
const divideStatus = require('./modules/getIndex');
const group = [];
const groupCount = 6;
const memberIndex = divideStatus(members); // 배열을 리턴
const OBidx = memberIndex[0];
const YBidx = memberIndex[1];

const mixedOBidx = groupMixer.mix(OBidx); // OB 15명
const mixedYBidx = groupMixer.mix(YBidx); // YB 21명

for (let i = 0; i < groupCount; i++) {
  group.push({ teamNumber: `${i + 1}조`, teamMember: [] });
}

let index = 0;
mixedOBidx.map((idx) => {
  group[index++].teamMember.push(members[idx]);
  if (index == groupCount) {
    index = 0;
  }
});

mixedYBidx.map((idx) => {
  group[index++].teamMember.push(members[idx]);
  if (index == groupCount) {
    index = 0;
  }
});

groupPrint(group);
