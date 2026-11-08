class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  calculateAverage() {
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / this.grades.length;
  }

  getGradeLetter(avg) {
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    if (avg >= 60) return 'D';
    if (avg >= 50) return 'E';
    return 'F';
  }

  getFinalStatus() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

const studentsList = [
  new Student(101, "أحمد محمد", [85, 90, 88], 92),
  new Student(102, "سارة أحمد", [42, 45, 48], 80),
  new Student(103, "محمود علي", [60, 55, 65], 70),
  new Student(104, "منى خالد", [46, 44, 43], 85)
];

const strugglingStudents = studentsList.filter(student => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg <= 49;
});

const adjustedStrugglingStudents = strugglingStudents.map(student => {
  const oldAvg = student.calculateAverage();
  const newAvg = oldAvg + 5;
  return {
    id: student.id,
    name: student.name,
    attendance: student.attendance,
    oldAverage: oldAvg,
    newAverage: newAvg,
    newGradeLetter: student.getGradeLetter(newAvg),
    newStatus: (newAvg >= 50 && student.attendance >= 75) ? "ناجح بالرأفة" : "يحتاج مراجعة"
  };
});

const totalNewAverages = adjustedStrugglingStudents.reduce((acc, student) => acc + student.newAverage, 0);
const count = adjustedStrugglingStudents.length;
const overallAdjustedAverage = count > 0 ? (totalNewAverages / count) : 0;

console.log("=========================================");
console.log(" 🎓 تقرير النظام الأكاديمي الشامل للطلاب");
console.log("=========================================\n");

studentsList.forEach((student, index) => {
  const avg = student.calculateAverage();
  const letter = student.getGradeLetter(avg);
  const status = student.getFinalStatus();

  console.log(`طالب رقم (${index + 1}):`);
  console.log(`- الاسم: ${student.name}`);
  console.log(`- رقم الجلوس: ${student.id}`);
  console.log(`- المتوسط: ${avg.toFixed(2)}`);
  console.log(`- التقدير: ${letter}`);
  console.log(`- النتيجة: ${status}`);
  console.log("-----------------------------------------");
});

console.log("\n=========================================");
console.log(" ⚖️ تقرير لجنة الرأفة للطلاب المتعثرين");
console.log("=========================================");

if (adjustedStrugglingStudents.length > 0) {
  console.log("مصفوفة الطلاب المتعثرين بعد تطبيق الرأفة (+5 درجات):");
  console.table(adjustedStrugglingStudents);
  console.log(`\n المتوسط العام لدرجات الطلاب المتعثرين بعد التعديل: ${overallAdjustedAverage.toFixed(2)}`);
} else {
  console.log("لا يوجد طلاب متعثرين في النطاق المحدد حالياً.");
}
console.log("=========================================");
