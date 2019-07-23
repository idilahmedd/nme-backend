import React from 'react'

const TeacherList = props =>  {
   let teachers;
   if ( props.teachers.length) {
      teachers = props.teachers.map((teacher, index) => {
         return <p className="teacherrow" key={index}>{teacher.name} | {teacher.email}</p>
      })
   } else {
      teachers = <p>No Teacher Data!</p>
   }
   return (
         <div className='TeacherList'>
            <h3>All the Teachers:</h3>
            {teachers}
            <hr/>
            <form onSubmit={props.handleSubmit}>
               <input onChange={props.handleTeacherNameChange} type="text" name="name" value={props.name}/>
               <input onChange={props.handleTeacherEmailChange} type="text" name="email" value={props.email}/>
               <input type="submit" value="Add Teacher"/>
            </form>
         </div>
      )
}


export default TeacherList;
