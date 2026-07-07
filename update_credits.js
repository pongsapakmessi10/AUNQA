const fs = require('fs');
const file = 'f:/Project/AUNQA/app/student/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  '<span>หน่วยกิตสะสมรายภาค (Credits by Semester)</span>',
  '<span>หน่วยกิตสะสมรายปี (Credits by Year)</span>'
);

const replacements = [
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 18, inProgress: 0 }\n        ]'
  },
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 1 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 36, inProgress: 0 }\n        ]'
  },
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 1 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 1",\s*earned:\s*19,\s*inProgress:\s*0\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 36, inProgress: 0 },\n          { term: "ปี 2", earned: 19, inProgress: 0 }\n        ]'
  },
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 1 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 1",\s*earned:\s*19,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 36, inProgress: 0 },\n          { term: "ปี 2", earned: 37, inProgress: 0 }\n        ]'
  },
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 1 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 1",\s*earned:\s*19,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 3 เทอม 1",\s*earned:\s*17,\s*inProgress:\s*0\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 36, inProgress: 0 },\n          { term: "ปี 2", earned: 37, inProgress: 0 },\n          { term: "ปี 3", earned: 17, inProgress: 0 }\n        ]'
  },
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 1 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 1",\s*earned:\s*19,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 3 เทอม 1",\s*earned:\s*17,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 3 เทอม 2",\s*earned:\s*13,\s*inProgress:\s*0\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 36, inProgress: 0 },\n          { term: "ปี 2", earned: 37, inProgress: 0 },\n          { term: "ปี 3", earned: 30, inProgress: 0 }\n        ]'
  },
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 1 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 1",\s*earned:\s*19,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 3 เทอม 1",\s*earned:\s*17,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 3 เทอม 2",\s*earned:\s*13,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 4 เทอม 1",\s*earned:\s*6,\s*inProgress:\s*0\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 36, inProgress: 0 },\n          { term: "ปี 2", earned: 37, inProgress: 0 },\n          { term: "ปี 3", earned: 30, inProgress: 0 },\n          { term: "ปี 4", earned: 6, inProgress: 0 }\n        ]'
  },
  {
    find: /history:\s*\[\s*\{\s*term:\s*"ปี 1 เทอม 1",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 1 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 1",\s*earned:\s*19,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 2 เทอม 2",\s*earned:\s*18,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 3 เทอม 1",\s*earned:\s*17,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 3 เทอม 2",\s*earned:\s*13,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 4 เทอม 1",\s*earned:\s*6,\s*inProgress:\s*0\s*\},?\s*\{\s*term:\s*"ปี 4 เทอม 2",\s*earned:\s*0,\s*inProgress:\s*6\s*\}\s*\]/g,
    replace: 'history: [\n          { term: "ปี 1", earned: 36, inProgress: 0 },\n          { term: "ปี 2", earned: 37, inProgress: 0 },\n          { term: "ปี 3", earned: 30, inProgress: 0 },\n          { term: "ปี 4", earned: 6, inProgress: 6 }\n        ]'
  }
];

for (let i = replacements.length - 1; i >= 0; i--) {
  content = content.replace(replacements[i].find, replacements[i].replace);
}

fs.writeFileSync(file, content);
console.log('Update completed');
