class Student {
    constructor(name,email,community){
        this.name = name;
        this.email = email;
        this.community = community;
    }
}

class Bootcamp {
    students = []
    constructor(name,level,newstudent){
        this.name = name;
        this.level = level;
        this.students.push(newstudent);
    }

    registerStudent(studentToRegister){
        if (((this.students.map(s=>s.email)).includes(studentToRegister.email)) === true){
            console.log(`This ${studentToRegister.email} is already in our system You already registered`);
        }else{
            this.students.push(studentToRegister);
            console.log(`Registering ${studentToRegister.email} to the bootcamp ${this.name}.`)
        }
        return this.students;
    }
}