<template>
  <div  class="edit-form">
    <h4></h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               v-model="currentStudent.name"
        />
      </div>
      <div class="form-group">
        <label for="age">Age</label>

        <input type="text" class="form-control" id="age"
               v-model="currentStudent.age"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentStudent.active ? "Active" : "Inactive" }}
      </div>
    </form>
    <button class="badge badge-primary mr-2"
            v-if="currentStudent.active"
            @click="updateActive(false)"
    >
      InActive
    </button>
    <button v-else class="badge badge-primary mr-2"
            @click="updateActive(true)"
    >
      Active
    </button>
    <button class="badge badge-danger mr-2"
            @click="deleteStudent"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
            @click="updateStudent"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

</template>
<script>

import StudentsDataServices from "@/service/StudentsDataServices";

export default {
  name: "student_compo",
  created() {
    console.log(this.$route);
    this.id = this.$route.params.id;
    console.log("//////////");
    console.log(this.id);
    console.log("//////////");

    // id = this.$route.params.id

    StudentsDataServices.get(this.id)
        .then(response => {
          this.currentStudent = response.data;

          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  },
  data(){
    return {
      currentStudent: {
        id: null,
        name: "loading",
        age: null,

      },
      message: ''
    };
    },


  methods: {

    updateActive(status) {
      var data = {
        id: this.currentStudent.id,
        name: this.currentStudent.name,
        age: this.currentStudent.age,
        active: status
      };
      StudentsDataServices.update(this.currentStudent.id, data)
          .then(response => {
            this.currentStudent.active = status;
            console.log(response.data);

          })
          .catch(e => {
            console.log(e);

          });
    },
    updateStudent() {
      StudentsDataServices.update(this.currentStudent.id, this.currentStudent)
          .then(response => {
            console.log(response.data);
            this.message = 'The student was updated successfully!';

            this.$router.push({ name: "paging-list"});
          })
          .catch(e => {
            console.log(e);
          });
    },
    deleteStudent() {
      StudentsDataServices.delete(this.currentStudent.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "students" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    console.log(this.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
