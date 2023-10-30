const axios = require('axios');
const _ = require('lodash'); // Import Lodash
const API = 'https://jservice.io/api/clues';
const NUM_CATEGORIES = 6; // Number of random categories you want

class JeopardyCategory {
    constructor(title) {
        this.title = title;
        this.questions = [];
        this.answers = [];
    }

    addQuestion(question, answer) {
        this.questions.push(question);
        this.answers.push(answer);
    }
}

function getRandomCategoriesWithQuestions(numCategories) {
    return axios.get(API)
        .then(response => {
            const dataArray = response.data;
            const categories = new Set();
            const categoryObjects = {};

            const shuffledCategories = _.shuffle(dataArray.map(item => item.category.title)).slice(0, numCategories);

            shuffledCategories.forEach(categoryTitle => {
                categoryObjects[categoryTitle] = new JeopardyCategory(categoryTitle);
            });

            dataArray.forEach(item => {
                const categoryTitle = item.category.title;
                if (categoryObjects[categoryTitle]) {
                    categoryObjects[categoryTitle].addQuestion(item.question, item.answer);
                }
            });

            return Object.values(categoryObjects);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

getRandomCategoriesWithQuestions(NUM_CATEGORIES)
    .then(categories => {
        categories.forEach(category => {
            console.log(category.title);
            console.log('Questions:', category.questions);
            console.log('Answers:', category.answers);
            console.log();
        });
    });
