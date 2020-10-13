const groupPrint = {
  print: (group) => {
    group.map((team) => {
      console.log(team.teamNumber, team.teamMember);
    });
  },
};

module.exports = groupPrint.print;