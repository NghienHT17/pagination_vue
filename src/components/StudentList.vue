<template>
  <div class="col-md-8">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search by Name"
             v-model="name"/>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"
                @click="searchName"
        >
          Search
        </button>
      </div>
    </div>
  </div>
  <h3>Student List</h3>
  <table class="table">
    <thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Active</th>
      <th scope="col"> Action</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(student) in students"
        :key=student.id
        >

      <th scope="row">{{student.id}}</th>
      <td>{{student.name}}</td>
      <td>{{student.age}}</td>
      <td>{{student.active}}</td>
      <td>
        <button @click="editStudent(student)"  type="button" class="btn btn-warning">

          Edit

      </button>
        <button @click="deleteStudent(student)" type="button" class="btn btn-danger">
          Delete
        </button>

      </td>

    </tr>
    </tbody>
  </table>
  <button @click="addStudent" type="button" class="m-6 btn btn-sm btn-primary">Add</button>
  <button class="m3 btn btn-sm btn-danger" @click="removeAllStudents">
    Remove All
  </button>


</template>

<script>
import StudentsDataServices from "../service/StudentsDataServices";


export default {
  name: "student-list",
  data() {
    return {
      name: "",
      students: [],
      currentIndex: -1,
      currentStudent: null


    }
  },
  props:{

  },
  methods: {
    getStudentList() {
      StudentsDataServices.getAll()
          .then(response => {
            this.students = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    searchName() {
      StudentsDataServices.findByName(this.name)
          .then(response => {
            this.students = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    addStudent(){
      this.$router.push({ name: "add"});
    },


    editStudent(student){
          const id = student.id;
      this.$emit('selectedStudent',student)
      // this.currentIndex = student.id;
      this.$router.push({path:`/students/${id}`});
      // this.$router.push({ name: "/students/"+ student.id});


    },
    deleteStudent(student){
      this.currentStudent= student;
      StudentsDataServices.delete(this.currentStudent.id)
          .then(response => {
            console.log(response.data);

            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });

    },
    removeAllStudents() {
      StudentsDataServices.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList(){
      this.getStudentList();
      this.currentStudent = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    this.getStudentList();

  }

}
</script>

<style>

</style>

