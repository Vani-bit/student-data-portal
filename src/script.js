
const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('studentList');

// get stored students or empty array
let students = JSON.parse(localStorage.getItem('students')) || [];

// render students on page load
window.onload = () => {
    renderStudents();
};

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

   
    const studentName = document.getElementById('studentName').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validation 
    if (!studentName || !studentID || !email || !contact) {
        alert('Please fill all the fields correctly.');
        return;
    }


    const newStudent = { studentName, studentID, email, contact };

    // Add the new student  
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();


    studentForm.reset();
});

// Function to render students in the table
function renderStudents() {
    studentList.innerHTML = ''; 

    students.forEach((student, index) => {
        
        const row = document.createElement('tr');
        row.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');

        row.innerHTML = `
            <td class="py-3 px-6 text-left">${student.studentName}</td>
            <td class="py-3 px-6 text-left">${student.studentID}</td>
            <td class="py-3 px-6 text-left">${student.email}</td>
            <td class="py-3 px-6 text-left">${student.contact}</td>
            <td class="py-3 px-6 text-center">
                <button class="bg-yellow-400 text-white px-3 py-1 rounded mr-2" onclick="editStudent(${index})">Edit</button>
                <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        studentList.appendChild(row);
    });
}

// Function to edit student details
function editStudent(index) {
    const student = students[index];

    document.getElementById('studentName').value = student.studentName;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // Remove the selected student from the list to update it
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}

// Function to delete a student
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}
