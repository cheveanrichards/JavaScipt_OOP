class Student {
    constructor(name,email,community){
        this.name = name;
        this.email = email;
        this.community = community;
    }
}

class Bootcamp {

    constructor(name,level,students=[]){
        this.name = name;
        this.level = level;
        this.students = students;
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