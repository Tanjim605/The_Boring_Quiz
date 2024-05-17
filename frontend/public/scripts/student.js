let studentObj
const url_string = window.location.href

// console.log(url_string);
const t_id = url_string.split(`/student/`)[1]   // url ke duita array te vag kore fele. 2nd elemente hoilo t_id


async function fetchStudentData() {
    const response = await fetch(`/api/student/${t_id}`)
    if (!response.ok) {
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }
    studentObj = await response.json()
    // console.log(studentObj);

    document.getElementById('s_name').innerText = studentObj.name
    document.getElementById('s_mail').innerText = studentObj.email
    document.getElementById('s_pass').innerText = studentObj.password

}

fetchStudentData()
