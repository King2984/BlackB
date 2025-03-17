document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html"; // Redirect if not logged in
    }

    const loggedInUser = sessionStorage.getItem("email");
    const isAdmin = loggedInUser === "kingali001@gmail.com"; // Check if admin

    // Show or hide add course and grade forms for admin
    if (isAdmin) {
        document.getElementById('add-course-form').style.display = 'block';
        document.getElementById('add-grade-form').style.display = 'block';
    } else {
        document.getElementById('add-course-form').style.display = 'none';
        document.getElementById('add-grade-form').style.display = 'none';
    }

    loadCourses();
    loadGrades();

    // Add course form handling
    document.getElementById('add-course-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const courseName = document.getElementById('course-name').value;
        const courseCode = document.getElementById('course-code').value;
        const courseDescription = document.getElementById('course-description').value;

        const newCourse = { name: courseName, code: courseCode, description: courseDescription };
        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(newCourse);
        localStorage.setItem('courses', JSON.stringify(courses));

        loadCourses(); // Reload courses
    });

    // Add grade form handling
    document.getElementById('add-grade-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const courseIndex = document.getElementById('select-course').value;
        const grade = document.getElementById('grade').value;

        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        const selectedCourse = courses[courseIndex];
        const newGrade = { course: selectedCourse, grade: grade };
        const grades = JSON.parse(localStorage.getItem('grades')) || [];
        grades.push(newGrade);
        localStorage.setItem('grades', JSON.stringify(grades));

        loadGrades(); // Reload grades
    });

    // Tab switching logic
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.getAttribute('data-target');
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => {
                section.classList.remove('active-section');
                if (section.id === target) {
                    section.classList.add('active-section');
                }
            });
        });
    });
});

// Load courses from localStorage
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // Clear previous courses

    courses.forEach(course => {
        const courseItem = document.createElement('li');
        courseItem.textContent = `${course.name} (${course.code}) - ${course.description}`;
        courseList.appendChild(courseItem);
    });

    // Populate course dropdown for adding grades
    const selectCourse = document.getElementById('select-course');
    selectCourse.innerHTML = ''; // Clear previous options
    courses.forEach((course, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${course.name} (${course.code})`;
        selectCourse.appendChild(option);
    });
}

// Load grades from localStorage
function loadGrades() {
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const gradeTable = document.getElementById('grade-table');
    gradeTable.innerHTML = ''; // Clear previous grades

    grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade.course.name} (${grade.course.code})</td><td>${grade.grade}</td>`;
        gradeTable.appendChild(row);
    });
}
