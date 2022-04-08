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
      <select v-model="pageSize" v-on:change="handlePageSizeChange()">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
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

      <th scope="row">{{ student.id }}</th>
      <td>{{ student.name }}</td>
      <td>{{ student.age }}</td>
      <td>{{ student.active }}</td>
      <td>
        <button @click="editStudent(student)" type="button" class="btn btn-warning">
          Edit

        </button>
        <button @click="deleteStudent(student)" type="button" class="btn btn-danger">
          Delete
        </button>

      </td>

    </tr>
    </tbody>
  </table>

  <br>
  <div>


    <ul class="pagination-item">
      <li>
        <button @click="prevPage">Prev</button>
      </li>
      <li v-for="numPage in numPagesList" :key="numPage">
        <button @click="handlePageChange(numPage)">{{ numPage }}</button>
      </li>
      <li>
        <button @click="nextPage">Next</button>
      </li>
    </ul>

  </div>

  <br>


  <button @click="addStudent" type="button" class="m-6 btn btn-sm btn-primary">Add</button>
  <button class="m3 btn btn-sm btn-danger" @click="removeAllStudents">
    Remove All
  </button>


</template>

<script>
import StudentsDataServices from "../service/StudentsDataServices";


export default {
  created() {
    this.getStudentList();
    console.log(this.count)


  },
  name: "paging-list",

  data() {
    return {
      numPagesList: [],
      numPages: null,
      // numPage: null,
      nameToSearch: "",
      students: [],
      // currentIndex: -1,
      currentStudent: null,
      searchName: "",
      page: 1,
      count: 0,
      pageSize: 3,
      pageSizes: [3, 6, 9],


    }
  },

  methods: {
    getRequestParams(searchString, page, pageSize) {
      let params = {};
      if (searchString) {
        params["name"] = searchString;
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
            console.log(response);
            console.log(params);
            const {studentList, totalStudents} = response.data;
            this.students = studentList;
            this.count = totalStudents;


            if (this.count % this.pageSize == 0) {
              this.numPages = this.count / this.pageSize
            } else {
              let result = this.count / this.pageSize;
              this.numPages = Math.floor(result) + 1;
              console.log(this.numPages)
            }
            this.numPagesList = Array.from(Array(this.numPages).keys());
            this.numPagesList.shift();

            console.log(this.numPagesList);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    prevPage() {
      this.page -= 1;
      this.getStudentList();
      console.log(this.page);
    },
    nextPage() {
      this.page += 1;
      this.getStudentList();
      console.log(this.page);
    },
    handlePageChange(value) {
      this.page = value;
      this.getStudentList();
    },
    handlePageSizeChange() {

      this.page = 1;
      alert('xin chao' + this.pageSize);
      this.getStudentList(null, this.page, this.pageSize);
    },

    addStudent() {
      this.$router.push({name: "add"});
    },


    editStudent(student) {
      const id = student.id;
      this.$emit('selectedStudent', student)

      this.$router.push({path: `/students/${id}`});



    },
    deleteStudent(student) {
      this.currentStudent = student;
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
    refreshList() {
      this.getStudentList();
      this.currentStudent = null;

    }
  },





}
</script>


<style scoped>
/*.demo-pagination-block + .demo-pagination-block {*/
/*  margin-top: 10px;*/
/*}*/
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.pagination-item li {
  display: inline-block;
}
</style>

