let teacherObj
const url_string = window.location.href

// console.log(url_string);
const t_id = url_string.split(`/teacher/`)[1]   // url ke duita array te vag kore fele. 2nd elemente hoilo t_id


async function fetchTeacherData() {
    const response = await fetch(`/api/teacher/${t_id}`)
    if (!response.ok) {
        console.log(`Something went wrong ${response.status}`);

        return response.json()
    }
    teacherObj = await response.json()
    console.log(teacherObj.name);

    document.getElementById('t_name').innerText = teacherObj.name
}

fetchTeacherData()

