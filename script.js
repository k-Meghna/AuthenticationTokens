function fetchData() {
    fetch("https://localhost:8080/allemps")

    .then((res)=>{
       return res.json()
      })

      .then(result=>
      result.forEach(element=> {
          document.write(element.name)
        //console.log(ele.emp.id)
        //console.log(ele.emp.name)
      }))
    }


    function addData() {

      const emp={"name":document.getElementById("name").value,
      "_id":document.getElementById("id").value,
       "branch":document.getElementById("branch").value};

       fetch("https://localhost:8080/addemp",
       {
           method:'POST',

         headers:{'Content-Type':'application/json'},

         body:JSON.stringify(emp)})
        // console.log("Added successfully")
         console.log("Added successfully")
        }
       // body : JSON.stringify(emp)
       // console.log("Added succesdsfully")
//<button onClick="deleteData()">DELETE</button>

      function deleteData() {
        id =document.getElementById("id").value

        fetch("http://localhost:3000/deleteemp/"+id,{

            method:"DELETE",

            headers:{'content-type':'application/json'},

            body:JSON.stringify({id:document.getElementById("id").value})

            })

            .then(response=>console.log("deleted"))

    }

       


   function updateData() {
    id =document.getElementById("id").value

    fetch("http://localhost:8080/updateemp/"+id,{

        method:"PUT",

        headers:{'content-type':'application/json'},

        body:JSON.stringify({"ename":document.getElementById("name").value,"eage":document.getElementById("age").value})

        })

        .then(response=>console.log("updated"))

   }