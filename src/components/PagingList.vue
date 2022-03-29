<template>
  <div class="col-md-8">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search by Name"
             v-model="nameToSearch"/>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"
                @click="page = 1; getStudentList();"
        >
          Search
        </button>
      </div>
    </div>
  </div>
  <div class="col-md-12">
    <div class="mb-3">
      Students per Page:
      <select v-model="pageSize" @change="handlePageSizeChange()">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
    <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
    ></b-pagination>
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
          <!--        <a href="'/students/' + {{student.id}}">-->
          Edit
          <!--        </a>-->

          <!--        //lam sai, dung ra can truyen data cua thang currentstudent vao thang component Student-->
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
// import student from "@/components/Student";
// // import Student from "@/components/Student";

export default {
  name: "paging-list",
  data() {
    return {
      nameToSearch: "",
      students: [],
      currentIndex: -1,
      currentStudent: null,
      searchName: "",
      page: 1,
      count: 0,
      pageSize: 3,
      pageSizes: [3, 6, 9],


    }
  },

  methods: {
    getRequestParams(nameToSearch, page, pageSize) {
      let params = {};
      if (nameToSearch) {
        params["name"] = nameToSearch;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    getStudentList() {
      const params = this.getRequestParams(
          this.nameToSearch,
          this.page,
          this.pageSize
      );
      StudentsDataServices.getAll(params)
          .then((response) => {
            const { students, totalStudents } = response.data;
            this.students = students;
            this.count = totalStudents;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    handlePageChange(value) {
      this.page = value;
      this.getStudentList();
    },
    handlePageSizeChange() {

      this.page = 1;
      this.getStudentList();
    },
    // searchName() {
    //   StudentsDataServices.findByName(this.name)
    //       .then(response => {
    //         this.students = response.data;
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    // },
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
            // this.$router.push({ name: '/'});
            // đang để phương thức là delete, giờ phải chuyển thành get
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
    //tại sao báo ko dùng ???
  }

//cần chạy hàm refreshList
}
</script>

<style>

</style>
<!--// updateStudent(student){-->
<!--//   //cần truyền tham số vào thằng update nếu ko sẽ nhảy sang component student-->
<!--//   this.currentStudent= student;-->
<!--//   StudentsDataServices.update(this.currentStudent.id, this.currentStudent)-->
<!--//       //logic xử lí thế này là sai, chỗ này cần truyền data của curentindex,student sang cho thằng student.vue-->
<!--//       .then(response => {-->
<!--//         console.log(response.data);-->
<!--//         // this.message = 'The student was updated successfully!';-->
<!--//-->
<!--//         console.log("student was updated!")-->
<!--//-->
<!--//         this.$router.push({ name: "students" });-->
<!--//       })-->
<!--//       .catch(e => {-->
<!--//         console.log(e);-->
<!--//       });-->
<!--// },-->
