class Jeopardy {
  constructor(category_title, questions, answers){
    this.category_title = category_title;  //Football //Soccer
    this.questions = questions; //what is a football, why is a footbal... 
    this.answers = answers;  //cause, hello,....
  }
}

const axios = require('axios');
API = 'https://jservice.io/api/clues'
let random = Math.floor(Math.random() *21)
axios.get(API)  
    .then(response => {
        const dataArray = response.data;
        let category_title = []
        let questions = []
        let answers = []
        const jeopardyObjects = []; // Store jeopardy objects in an array
        
        const category_id = dataArray.filter(val => {
          return val.category_id === random;
      
      
      })
        
      category_id.forEach(question => {
        const JeopardyObject = new Jeopardy(
          question.category.title,
          question.question,
          question.answer
        );
        jeopardyObjects.push(JeopardyObject);
      });
      
      console.log("HELLO");
      console.log(jeopardyObjects); // Array of Jeopardy objects
      // Convert to a Set to remove duplicates and back to an array
        category_title = Array.from(new Set(category_title));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });