const ServerSeminar1 = [
  {
    name: "남궁권",
    part: "Server",
    status: "OB",
    gender: "남",
    사는곳: "부천",
    나이: "26",
    취미: "산책"
  },
  {
    name: "석영현",
    part: "Server",
    status: "OB",
    gender: "여",
    사는곳: "부천",
    나이: "26",
    취미: "산책"
  },
  {
    name: "이현주",
    part: "Server",
    status: "OB",
    gender: "여",
    사는곳: "부천",
    나이: "24",
    취미: "산책"
  },
  {
    name: "신지혜",
    part: "Server",
    status: "YB",
    gender: "여",
    사는곳: "북한산",
    나이: "23",
    취미: "산책"
  },
  {
    name: "이수진",
    part: "Server",
    status: "OB",
    gender: "여",
    사는곳: "부천",
    나이: "26",
    취미: "산책"
  },
  {
    name: "양재욱",
    part: "Server",
    status: "OB",
    gender: "남",
    사는곳: "부천",
    나이: "26",
    취미: "산책"
  }
]

const getMemberList = (members) => {
  members.filter(member => {
    console.log(member);
  });
}

getMemberList(ServerSeminar1);