const fs = require('fs');
const file = 'f:/Project/AUNQA/app/student/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldFormat = {
  'ปี 1 เทอม 1': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 } ]',
  'ปี 1 เทอม 2': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 } ]',
  'ปี 2 เทอม 1': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 } ]',
  'ปี 2 เทอม 2': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 } ]',
  'ปี 3 เทอม 1': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 } ]',
  'ปี 3 เทอม 2': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 }, { term: "ปี 3 เทอม 2", earned: 13, inProgress: 0 } ]',
  'ปี 4 เทอม 1': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 }, { term: "ปี 3 เทอม 2", earned: 13, inProgress: 0 }, { term: "ปี 4 เทอม 1", earned: 6, inProgress: 0 } ]',
  'ปี 4 เทอม 2': '[ { term: "ปี 1 เทอม 1", earned: 18, inProgress: 0 }, { term: "ปี 1 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 2 เทอม 1", earned: 19, inProgress: 0 }, { term: "ปี 2 เทอม 2", earned: 18, inProgress: 0 }, { term: "ปี 3 เทอม 1", earned: 17, inProgress: 0 }, { term: "ปี 3 เทอม 2", earned: 13, inProgress: 0 }, { term: "ปี 4 เทอม 1", earned: 6, inProgress: 0 }, { term: "ปี 4 เทอม 2", earned: 0, inProgress: 6 } ]',
};

for (const term in oldFormat) {
  const regex = new RegExp(`("${term}"\\s*:\\s*\\{[\\s\\S]*?credits\\s*:\\s*\\{[\\s\\S]*?history\\s*:\\s*)\\[[\\s\\S]*?\\](\\s*\\}\\s*,?\\s*characteristics)`, 'g');
  content = content.replace(regex, "$1" + oldFormat[term] + "$2");
}

fs.writeFileSync(file, content);
console.log('Restore completed');
