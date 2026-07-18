---
layout: default
title: Course Registration Quiz
parent: Module 3
grand_parent: MSE-DS Onboarding Course
nav_order: 4
---

# Module 3 Quiz: Course Registration

Test your understanding of course registration, academic expectations, and Path@Penn features.

{% include mcq.html %}

<div id="module3-quiz"></div>

<script>
renderQuiz("module3-quiz", [
  {
    q: "Which of the following can you do through Path@Penn?",
    options: [
      "Update your emergency contacts and address information",
      "Access Library Services",
      "View student billing and payment information",
      "View academic records and transcript orders"
    ],
    answer: [0, 2, 3],
    explanation: "Library services are accessed through a separate library portal."
  },
  {
    q: "If the onboarding course is not completed by the due date then a registration hold may be placed on a student's account.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Failure to complete it by the deadline may result in a registration hold, which would prevent you from registering for courses."
  },
  {
    q: "Students can expect to dedicate 15 hours or more to each course per week.",
    options: ["True", "False"],
    answer: 0,
    explanation: "MSE-DS Online courses are rigorous. Students should expect to dedicate an average of 15+ hours per week per course, with some weeks requiring 20–25 hours."
  },
  {
    q: "Students must register for at least one course unit during the Fall and Spring semesters in order to remain continuously enrolled in their programs.",
    options: ["True", "False"],
    answer: 0,
    explanation: "A student may not drop a course if it is the only course for which they are registered. They would need to request a Leave of Absence (or deferral in their first term)."
  },
  {
    q: "If I choose to work ahead, course staff will be available to help me with questions regarding modules that are in a future week of the course.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Course staff prioritize answering questions about the current week's content. Questions about future weeks may take significantly longer to answer."
  },
  {
    q: "When is the last day to drop a course without financial obligation?",
    options: [
      "The late course drop deadline (typically weeks three through six of term)",
      "The course withdrawal deadline (typically begins at week seven of the term)",
      "The first day of classes (first day of week 1)",
      "The course drop deadline (typically the first two weeks of term)"
    ],
    answer: 3,
    explanation: "The course drop deadline, typically in the first two weeks of term, is when you can drop without financial obligation and receive a 100% tuition refund."
  },
  {
    q: "Penn Engineering Online Courses end with which section number?",
    options: ["001", "501", "101", "401"],
    answer: 1,
    explanation: "Penn Engineering Online courses have section number 501 (e.g., CIT 5920-501). When searching in Path@Penn, look for courses ending in 501."
  }
]);
</script>

---

**Next:** [Module 4: Coming Soon](../Module%204/index.md)
