// Initialize empty arrays to store courses and grades (using localStorage)
if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify([])); // Stores courses as an empty array initially
}

if (!localStorage.getItem('grades')) {
    localStorage.setItem('grades', JSON.stringify([])); // Stores grades as an empty array initially
}

// Function to load courses into the UI
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses'));
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // Clear the existing list
    courses.forEach(course => {
        const courseItem = document.createElement('li');
        courseItem.textContent = `${course.name} (${course.code}) - ${course.description}`;
        courseList.appendChild(courseItem);
    });

    // Populate the course selection dropdown for adding grades
    const selectCourse = document.getElementById('select-course');
    selectCourse.innerHTML = ''; // Clear existing options
    courses.forEach((course, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${course.name} (${course.code})`;
        selectCourse.appendChild(option);
    });
}

// Function to load grades into the UI
function loadGrades() {
    const grades = JSON.parse(localStorage.getItem('grades'));
    const gradeTable = document.getElementById('grade-table');
    gradeTable.innerHTML = ''; // Clear the existing table
    grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade.course.name} (${grade.course.code})</td><td>${grade.grade}</td>`;
        gradeTable.appendChild(row);
    });
}

// Handle form submission for adding a course
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

    loadCourses(); // Refresh the course list
});

// Handle form submission for adding a grade
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

    loadGrades(); // Refresh the grade table
});

// Logout function
function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

// Load the courses and grades on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if logged in
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html"; // Redirect to login page if not logged in
    } else {
        loadCourses();
        loadGrades();
    }
});
