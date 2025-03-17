if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify([])); // Empty courses array initially
}

if (!localStorage.getItem('grades')) {
    localStorage.setItem('grades', JSON.stringify([])); // Empty grades array initially
}

// Load courses from localStorage
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses'));
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
    const grades = JSON.parse(localStorage.getItem('grades'));
    const gradeTable = document.getElementById('grade-table');
    gradeTable.innerHTML = ''; // Clear previous grades
    grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade.course.name} (${grade.course.code})</td><td>${grade.grade}</td>`;
        gradeTable.appendChild(row);
    });
}

// Add course form submission
document.getElementById('add-course-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseName = document.getElementById('course-name').value;
    const courseCode = document.getElementById('course-code').value;
    const courseDescription = document.getElementById('course-description').value;

    const newCourse = {
        name: courseName,
        code: courseCode,
        description: courseDescription
    };

    const courses = JSON.parse(localStorage.getItem('courses'));
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    loadCourses(); // Refresh course list
});

// Add grade form submission
document.getElementById('add-grade-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseIndex = document.getElementById('select-course').value;
    const grade = document.getElementById('grade').value;

    const courses = JSON.parse(localStorage.getItem('courses'));
    const selectedCourse = courses[courseIndex];

    const newGrade = {
        course: selectedCourse,
        grade: grade
    };

    const grades = JSON.parse(localStorage.getItem('grades'));
    grades.push(newGrade);
    localStorage.setItem('grades', JSON.stringify(grades));

    loadGrades(); // Refresh grade table
});

// Logout function
function logout() {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('email');
    window.location.href = 'index.html'; // Redirect to login page
}

// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html"; // Redirect to login page if not logged in
    } else {
        const loggedInUser = sessionStorage.getItem("email");
        if (loggedInUser !== "ali.elzoridy@pccc.edu" && loggedInUser !== "kingali001@gmail.com") {
            window.location.href = "index.html"; // Redirect to login page if user is not authorized
        }
        loadCourses();
        loadGrades();
    }
});
