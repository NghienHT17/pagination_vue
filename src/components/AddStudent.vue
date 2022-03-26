<template>
  <div class="submit-form">

    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Ten sinh vien</label>
        <input type="text" class="form-control" id="name" placeholder="Nhap ten sinh vien" v-model="student.name">
        <!--             <small id="emailHelp" class="form-text text-muted">Nhập tên sinh viên .</small>-->
      </div>
      <div class="form-group">
        <label for="tuoi">Nhap tuoi</label>
        <input v-model="student.age" type="text" class="form-control" id="tuoi" placeholder="Nhap tuoi sinh vien">
      </div>
      <button @click="saveStudent" type="submit" class="btn btn-primary">Submit</button>

    </div>
    <div v-else>
      <h4>Student create successfully!</h4>
      <button class="btn btn-success" @click="newStudent">Continue Add</button>

    </div>


  </div>


</template>

<script>
import StudentsDataServices from "@/service/StudentsDataServices";

export default {
  name: "add-student",
  data() {
    return {
      student: {
        id: null,
        name: "",
        age: "",
        active: false
      },
      submitted: false
    }
  },
  methods: {
    saveStudent() {
      var data = {
        name: this.student.name,
        age:this.student.age
      };
      StudentsDataServices.create(data)
      .then(response =>{
        this.student.id =response.data.id;
        console.log(response.data);//.data ok ko?;
        this.submitted = true;

      })
      .catch(e =>{
        console.log(e);
      })

    },
    newStudent() {
        this.submitted =false;
        this.student ={}

    }
  },


}
</script>


<style>

</style>

