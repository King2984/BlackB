document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html"; 
    }

    const loggedInUser = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    const isAdmin = role === "admin";

    if (isAdmin) {
        document.getElementById('add-course-form').style.display = 'block';
        document.getElementById('add-grade-form').style.display = 'block';
    }

    loadCourses();
    loadGrades();

    document.getElementById('add-course-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('course-name').value;
        const code = document.getElementById('course-code').value;
        const description = document.getElementById('course-description').value;

        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push({ name, code, description });
        localStorage.setItem('courses', JSON.stringify(courses));

        loadCourses();
    });

    document.getElementById('add-grade-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const courseIndex = document.getElementById('select-course').value;
        const grade = document.getElementById('grade').value;

        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        const selectedCourse = courses[courseIndex];

        const grades = JSON.parse(localStorage.getItem('grades')) || [];
        grades.push({ student: loggedInUser, course: selectedCourse, grade });
        localStorage.setItem('grades', JSON.stringify(grades));

        loadGrades();
    });

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active-section');
                if (section.id === tab.getAttribute('data-target')) {
                    section.classList.add('active-section');
                }
            });
        });
    });
});

function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';

    courses.forEach(course => {
        const courseItem = document.createElement('li');
        courseItem.textContent = `${course.name} (${course.code}) - ${course.description}`;
        courseList.appendChild(courseItem);
    });

    const selectCourse = document.getElementById('select-course');
    selectCourse.innerHTML = '';
    courses.forEach((course, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${course.name} (${course.code})`;
        selectCourse.appendChild(option);
    });
}

function loadGrades() {
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const gradeTable = document.getElementById('grade-table');
    const loggedInUser = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    
    gradeTable.innerHTML = '';

    grades.forEach(grade => {
        if (role === "admin" || grade.student === loggedInUser) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${grade.course.name} (${grade.course.code})</td><td>${grade.grade}</td>`;
            gradeTable.appendChild(row);
        }
    });
}
