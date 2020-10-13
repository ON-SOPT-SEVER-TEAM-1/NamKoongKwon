const teamMember = [
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
    사는곳: "동작구 상도동",
    나이: "23",
    취미: "낮잠"
  },
  {
    name: "이현주",
    part: "Server",
    status: "OB",
    gender: "여",
    사는곳: "용산구 청파동",
    나이: "24",
    취미: "넷플릭스 ㅎㅅㅎ"
  },
  {
    name: "신지혜",
    part: "Server",
    status: "YB",
    gender: "여",
    사는곳: "쌍문역",
    나이: "23",
    취미: "산책"
  },
  {
    name: "이수진",
    part: "Server",
    status: "OB",
    gender: "여",
    사는곳: "고양시",
    나이: "23",
    취미: "닌텐도 게임"
  },
  {
    name: "양재욱",
    part: "Server",
    status: "OB",
    gender: "남",
    사는곳: "서초구 잠원동",
    나이: "25",
    취미: "운동하기"
  }
];

const getMemberList = (members) => {
  members.filter(member => {
    console.log(member);
  });
}

getMemberList(teamMember);